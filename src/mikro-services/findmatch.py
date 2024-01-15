from sentence_transformers import SentenceTransformer, util
embedder = SentenceTransformer('all-MiniLM-L6-v2')
import torch
from kafka import KafkaConsumer, KafkaProducer
import json


"""
This is a simple application for sentence embeddings: semantic search
We have a corpus with various sentences. Then, for a given query sentence,
we want to find the most similar sentence in this corpus.
This script outputs for various queries the top 5 most similar sentences in the corpus.
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
    fields_to_retrieve = {'_id': 1, 'keywords': 1 ,'source': 1}  # 1 to include, 0 to exclude
    exclude_id = ObjectId(news_id)
    # Find documents excluding a specific _id with specific fields
    raw_news_ripo = list(rawNews_collection.find({'_id': {'$ne': exclude_id}, 'matchTo':{'$ne': message.value['id']}}, projection=fields_to_retrieve))
    print(raw_news_ripo)
    corpus = [" ".join(item['keywords']) for item in raw_news_ripo]
   
# Corpus with example sentences
# corpus1 = ['A man is eating food.',
#           'A man is eating a piece of bread.',
#           'The girl is carrying a baby.',
#           'A man is riding a horse.',
#           'A woman is playing violin.',
#           'Two men pushed carts through the woods.',
#           'A man is riding a white horse on an enclosed ground.',
#           'A monkey is playing drums.',
#           'A cheetah is running behind its prey.'
#           ]
    corpus_embeddings = embedder.encode(corpus, convert_to_tensor=True)
    # Query sentences:

    queries = [" ".join(message.value['keywords'])]

    # Find the closest 5 sentences of the corpus for each query sentence based on cosine similarity
    top_k = min(5, len(corpus))
    for query in queries:
        query_embedding = embedder.encode(query, convert_to_tensor=True)
        # We use cosine-similarity and torch.topk to find the highest 5 scores
        cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
        top_results = torch.topk(cos_scores, k=top_k)
        print("\n\n======================\n\n")
        print("Query:", query)
        print("\nTop 5 most similar sentences in corpus:")
        match = False
        for score, idx in zip(top_results[0], top_results[1]):
            print(corpus[idx], "(Score: {:.4f})".format(score))
            if (score > 0.7) or (raw_news_ripo[idx]['source']  == message.value['source'] and score > 0.5): # message.value['source]
                match_id = raw_news_ripo[idx]['_id']
                update_operation = {
                '$set': {
                'matchTo': str(match_id),  # Add or modify fields as needed
                    }
                }
                result = rawNews_collection.update_one({'_id': exclude_id}, update_operation)
                print(f"Matched {result.matched_count} documents and modified {result.modified_count} documents.")
                match = True
                break
        if (not match):
            producer.send('toLocation', {"id": news_id})
            print(f"the news id {news_id} sent to 'toLocation' topic")

        
#     # Alternatively, we can also use util.semantic_search to perform cosine similarty + topk
#     # hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=5)
#     # hits = hits[0]      #Get the hits for the first query
#     # for hit in hits:
#     #     print(corpus[hit['corpus_id']], "(Score: {:.4f})".format(hit['score']))
    

# fields_to_retrieve = {'_id': 1, 'keywords': 1}  
# exclude_id = ObjectId("65a4e2ffd47ec61cd447d60a")
# print(list(rawNews_collection.find({'_id': {'$ne': exclude_id}, 'matchTo':{'$ne': exclude_id}}, projection=fields_to_retrieve)))