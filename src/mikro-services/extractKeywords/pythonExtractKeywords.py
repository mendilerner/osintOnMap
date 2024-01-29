import json
from keybert import KeyBERT
from kafka import KafkaConsumer, KafkaProducer

kw_model = KeyBERT(model='all-MiniLM-L6-v2')

from pymongo import MongoClient
client = MongoClient("mongodb+srv://orders_db:finalProjectTeam4@cluster0.xymtjg3.mongodb.net/rawNews?retryWrites=true&w=majority")
db = client.rawNews
rawNews_collection = db.news

# To consume latest messages and auto-commit offsets
consumer = KafkaConsumer('raw-news',
                         value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                         group_id='raw-news-group',
                         bootstrap_servers=['localhost:9092'])
# produce json messages
producer = KafkaProducer(value_serializer=lambda m: json.dumps(m).encode('utf-8'),
                         bootstrap_servers=['localhost:9092'])


for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    if len(message.value['rawNews']) > 10:
        
      keywords = kw_model.extract_keywords(message.value['rawNews'], keyphrase_ngram_range=(1, 1), stop_words='english', top_n=5) 
      extracted_keywords = [item[0] for item in keywords]
      raw_news = {"source": message.value['source'],
                "body": message.value['rawNews'],
                "time": message.value['time'],
                "keywords": extracted_keywords}

      raw_news_id = rawNews_collection.insert_one(raw_news).inserted_id
      producer.send('keywords', {"id": str(raw_news_id), "keywords": extracted_keywords, "source": message.value['source']})
      print(raw_news_id)
      print(extracted_keywords)
      print ("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
                                          message.offset, message.key,
                                          message.value))

