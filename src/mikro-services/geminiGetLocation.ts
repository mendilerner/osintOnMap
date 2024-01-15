import { config } from "dotenv";
import { KafkaMessage } from "kafkajs";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { connectToMongoDB } from "../connectionToDB/mongooseConnection";
import RawNews from "../connectionToDB/newsSchema";
import axios from "axios";
import kafka from "../kafka/kafkaInstance";
const consumer = kafka.consumer({ groupId: 'toLocationGroup' });
config()
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const coordinateApiKey = process.env.COORDINAATES_API_KEY

async function getLiteralLocation(newsReport: string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const prePrompt = `this is a headline of news report please give me the location of this event, in simple format {<singel name of city location>, <singel name of country location>}. (note: if the event is without specific location and the like please give me location that related to this event) :`
  const prompt = `${prePrompt}'${newsReport}'`
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text
}

const getCoordinates = async (literallLocation:string) => {
    try{  
        const response = await axios.get(`https://geocode.maps.co/search?q=${literallLocation}&api_key=${coordinateApiKey}`)
        const coordinates = [response.data[0].lat, response.data[0].lon]
        console.log(coordinates);
        return coordinates
    }
    catch (err){
        console.log(err);
    }
    try{

    }
    catch (err){
        console.log(err); 
    }
}

const processMessage = async ( message : KafkaMessage) => {
    try {
        if (message.value === null) 
        {
            console.log('the massage is null');
            return
        }       
      const { id } = JSON.parse(message.value.toString());
      
        const rawNews = await RawNews.findById(id)
        const litralLocation = await getLiteralLocation(rawNews?.body)
        const coordinates = await getCoordinates(litralLocation)
        await RawNews.findByIdAndUpdate(id,{
            literalLocation: litralLocation.split(", "),
            coordinates: coordinates
        })
        
    } catch (error) {
      console.error(`Error processing message: ${error}`);
    }
  };

const runConsumer = async () => {
    await connectToMongoDB()
    await consumer.subscribe({ topic: 'toLocation' });
    await consumer.run({
      eachMessage: async ({ message }) => {
        await processMessage(message);
      }
    });

  };

runConsumer()