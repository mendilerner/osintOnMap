import axios from 'axios'
import cron from'node-cron';
import kafka from '../kafka/kafkaInstance';
import { getLastNews } from './rawNewsDal';
import { rawNews } from '../interfaces';



const producer = kafka.producer();
      
const searchIngoogle = async (keyWordsList: [string]) => {
  let data = JSON.stringify({
    "q": keyWordsList.join(" ")
  });
  
  let config = {
    method: 'post',
    url: 'https://google.serper.dev/news',
    headers: { 
      'X-API-KEY': '64c6c290a4606ca02917346194b8dc782a8b1d46', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  
  
  try{
    const response = await axios(config)
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}
// cron.schedule('0 8,12,16,20,24 * * *', function() {
//   console.log('running a task every minute');
// });

cron.schedule('* * * * *', function() {
  console.log('running a task every minute');
});

const run = async () => {
  await producer.connect();
}
run()
const main = async () => {
   const newsArray = await getLastNews(6)
   newsArray.slice(0,3).forEach(async (newsraw) => {
    const newsdata = await searchIngoogle(newsraw.keywords)
    
    if (newsdata.news.length >= 2){
      // else can search under 'search' tab not 'news'
      const rawNews = {source: message.sender?.username, rawNews: message.message ,time: formattedDate}
      try {
        
        // Produce the data to Kafka topic
        await producer.send({
          topic: 'raw-news',
          messages: [
            { value: JSON.stringify(rawNews) }
          ]
        });
        console.log(rawNews);
        console.log(`Data sent to Kafka at ${formattedDate}`);
      } catch (error) {
        console.error('Error occurred:', error);
      }}
   })
}
//setInterval((main, 3600*60*6))

interface processedNews  {
  title: string;
  snippet: string; // news[i].snippet
  linkA: string; // news[i].link
  rawNews: rawNews
}