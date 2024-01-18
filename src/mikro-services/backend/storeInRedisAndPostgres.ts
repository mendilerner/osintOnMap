import kafka from '../../kafka/kafkaInstance'
import {createClient} from 'redis'
import {  KafkaMessage } from 'kafkajs';
import { processedNews } from './itypes';
import pool from './dataAccess/postgressConnection';
import { ObjectId } from 'mongoose';
const consumer = kafka.consumer({ groupId: 'storeInRedisGroup' });
const redisClient = createClient({
    url: 'redis://:mendi1234@127.0.0.1:6379'
})

const DEFAULT_EXPIRATION = 86400
console.log('default expiration: ', DEFAULT_EXPIRATION);
const connectToRedis = async () => {
    try {
      console.log('Trying to connect to Redis...');
      await redisClient.connect();
      console.log('Connected to Redis');
    } catch (error) {
      console.error('Error connecting to Redis:', error);
    }
  };
const storeNewMessagetoRedis = async (processedNews: processedNews, newsId:string) => {
    try{
      const existKey = await redisClient.exists(`news_report:${newsId}`);
      if (!existKey) {
          await redisClient.json.set(`news_report:${newsId}`, '$', processedNews)
          await redisClient.expire(`news_report:${newsId}`, DEFAULT_EXPIRATION)
      }
      console.log(`Data for ${processedNews._id} inserted successfully to redis.`);
    }
    catch(err){
      console.log(`Error in store to redis: ${err}`);
    }
}

const storeInPostgres = async (processedNews:processedNews) => {
    try{
      const { _id, source, link, snippet, body, keywords, time, rating, matchTo, coordinates} = processedNews
      const news = await pool.query(
        "INSERT INTO news ( _id, source, link, snippet, body, keywords, time, rating, matchTo, coordinates) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [ _id, source, link, snippet, body, keywords, time, rating, matchTo, coordinates]
      );
      console.log(`Data for ${processedNews._id} inserted successfully to redis.`);
      return news.rows;
    }
    catch (err){
      console.log(`Error in store to postgres: ${err}`);
    }
}
const processMessage = async ( message : KafkaMessage) => {
    try {
        if (message.value === null) 
        {
            console.log('the massage is null');
            return
        }  
           
      const processedNews = {...JSON.parse(message.value.toString()) };
      console.log(processedNews);
      const newsId = processedNews._id.toString()
      console.log(newsId);
      await storeNewMessagetoRedis(processedNews,newsId)
      await storeInPostgres(processedNews)
    } catch (error) {
      console.error(`Error processing message: ${error}`);
    }
  };

const runConsumer = async () => {
    await pool.connect()
    await connectToRedis()
    await consumer.subscribe({ topic: 'processedNews' });

    
    await consumer.run({
      eachMessage: async ({ message }) => {
        await processMessage(message);
      }
    });

  };

runConsumer()