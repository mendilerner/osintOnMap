from sentence_transformers import SentenceTransformer, util
embedder = SentenceTransformer('all-MiniLM-L6-v2')
import torch
from kafka import KafkaConsumer, KafkaProducer
import json
from matchByGemini import getGeminiDetection
from datetime import datetime, timedelta
def update_db_for_match(_match_id):
    update_operation = {
                '$set': {
                'matchTo': str(_match_id),  # Add or modify fields as needed
                    }
                }
    update_operation_increase_rating = {
               '$inc': {
                    'rating': 1,  
                 }
                }
    result = rawNews_collection.update_one({'_id': exclude_id}, update_operation)
    result2 = rawNews_collection.update_one({'_id': _match_id}, update_operation_increase_rating)
    print(f"Matched {result.matched_count} documents and modified {result.modified_count} documents.")

def get_time_in_as_string(_hoursAgo=0):
    delay = 2
    date = datetime.now() - timedelta(hours=delay +_hoursAgo) 
    date_str = date.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    print(date_str)
    return date_str
"""
This is a simple application for sentence embeddings: semantic search
We have a corpus with various sentences. Then, for a given query sentence,
we want to find the most similar sentence in this corpus.
This script outputs for various queries the top 4 most similar sentences in the corpus.
"""
from pymongo import MongoClient
from bson import ObjectId
client = MongoClient("mongodb+srv://orders_db:finalProjectTeam4@cluster0.xymtjg3.mongodb.net/rawNews?retryWrites=true&w=majority")
db = client.rawNews
rawNews_collection = db.news

# To consume latest messages and auto-commit offsets
consumer = KafkaConsumer('keywords',
                         value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                         group_id='keywords-group',
                         bootstrap_servers=['localhost:9092'])
producer = KafkaProducer(value_serializer=lambda m: json.dumps(m).encode('utf-8'),
                        bootstrap_servers=['localhost:9092'])

for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    news_id = message.value['id']
    fields_to_retrieve = {'_id': 1, 'keywords': 1 ,'source': 1, 'body': 1}  
    exclude_id = ObjectId(news_id)
    # Find documents excluding a specific _id with specific fields
    raw_news_ripo = list(rawNews_collection.find({'matchTo':{'$ne': message.value['id']}, "time": {
        "$gte": get_time_in_as_string(72),
        "$lt": get_time_in_as_string()
    }}, projection=fields_to_retrieve)) # removed: '_id': {'$ne': exclude_id},
    for index ,item in enumerate(raw_news_ripo):
        if item.get('_id') == exclude_id:
            print("find the body of the new news report", item.get('_id'), item.get('body'))
            new_report_from_db = raw_news_ripo.pop(index)
            body_of_new_report = new_report_from_db['body']
            break
    corpus = [" ".join(item['keywords']) for item in raw_news_ripo]

    corpus_embeddings = embedder.encode(corpus, convert_to_tensor=True)
    # Query sentences:

    new_report = " ".join(message.value['keywords'])

    # Find the closest 4 sentences of the corpus for each query sentence based on cosine similarity
    top_k = min(4, len(corpus))
    query_embedding = embedder.encode(new_report, convert_to_tensor=True)
    # We use cosine-similarity and torch.topk to find the highest 4 scores
    cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
    top_results = torch.topk(cos_scores, k=top_k)
    print("\n\n======================\n\n")
    print("new news report:", new_report)
    print("\nTop 4 most similar sentences in corpus:")
    match = False
    to_deep_examination = []
    for score, idx in zip(top_results[0], top_results[1]):
        print(corpus[idx], "(Score: {:.4f})".format(score))
        match_id = raw_news_ripo[idx]['_id']
        # handle obvious duplicate news
        if (score > 0.7) or (raw_news_ripo[idx]['source']  != message.value['source'] and score > 0.65): # message.value['source]
            update_db_for_match(match_id)
            match = True
            break
        elif (len(to_deep_examination) < 3 or score > 0.25):
            to_deep_examination.append(match_id)
    # handle suspicus duplicate news        
    if (len(to_deep_examination) > 0):
        print("to deep examination: ", to_deep_examination)
        filtered_bodies = [{"body": obj['body'], "_id": obj['_id']} for obj in raw_news_ripo if obj['_id'] in to_deep_examination]
        print("filter bodies: " , filtered_bodies)
        reports_list = [obj['body'] for obj in filtered_bodies]
        print("reports_list", reports_list)
        result = getGeminiDetection(new_report_from_db.get('body'),reports_list)
        print('result: ',result)
        if len(result) == 3:
            for idx, item in enumerate(result):
                print("\n======================\n")
                print(filtered_bodies[idx]['_id'])
                if item == 2:
                    update_db_for_match(filtered_bodies[idx]['_id'])
                    match = True
                    break  
    if (not match):
        producer.send('toLocation', {"id": news_id})
        print(f"the news id {news_id} sent to 'toLocation' topic")
