import axios from 'axios'
import cron from'node-cron';
import kafka from '../kafka/kafkaInstance';
import { getLastNews } from './rawNewsDal';
import { rawNews } from '../interfaces';
import { connectToMongoDB } from '../connectionToDB/mongooseConnection';



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
    return response.data.news
  }
  catch (error) {
    console.log(error);
  }
}
// cron.schedule('0 8,12,16,20,24 * * *', function() {
//   console.log('running a task every minute');
// });

// cron.schedule('* * * * *', function() {
//   console.log('running a task every minute');
// });

const run = async () => {
  await producer.connect();
  await connectToMongoDB()
}

const main = async () => {
   const newsArray = await getLastNews(20)
   newsArray.slice(0,1).forEach(async (newsRaw) => {
    const newsdata = await searchIngoogle(newsRaw.keywords)
    if (newsdata.length >= 1){
      const firstSearchNews = newsdata[0]
      // else can search under 'search' tab not 'news'
      const rawNews = {...newsRaw._doc, snippet: firstSearchNews.snippet ,link: firstSearchNews.link}
      console.log("rawNews:",rawNews);
      try {
        
        // Produce the data to Kafka topic
        await producer.send({
          topic: 'processedNews',
          messages: [
            { value: JSON.stringify(rawNews) }
          ]
        });
        //console.log(`Data sent to Kafka at ${formattedDate}`);
      } catch (error) {
        console.error('Error occurred:', error);
      }}
   })
}
run()
main()
//setInterval(main, 1000*3600)

interface processedNews  {
  title: string;
  snippet: string; // news[i].snippet
  linkA: string; // news[i].link
  rawNews: rawNews;

}