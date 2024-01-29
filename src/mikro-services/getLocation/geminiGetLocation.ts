import { config } from "dotenv";
import { KafkaMessage } from "kafkajs";
import {GoogleGenerativeAI ,HarmBlockThreshold, HarmCategory } from "@google/generative-ai"
import { connectToMongoDB } from "../../connectionToDB/mongooseConnection";
import RawNews from "../../connectionToDB/newsSchema";
import axios from "axios";
import kafka from "../../kafka/kafkaInstance";

const consumer = kafka.consumer({ groupId: 'toLocationGroup' });

config()
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const coordinateApiKey = process.env.COORDINAATES_API_KEY


const safetySettings=[
  {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
  },{
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
  },{
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
       threshold: HarmBlockThreshold.BLOCK_NONE,
  }
]
async function getLiteralLocation(newsReport: string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings});
  const prePrompt = `this is a headline of news report please give me the location (only locations on earth planet) of this event, in simple format <singel name of city location>, <singel name of country location>. (note: if the event is without specific location and the like, please give me location that related to this event) :`
  const prompt = `${prePrompt}'${newsReport}'`
  console.log(prompt)
  const result = await model.generateContent(prompt);
  const response = result.response;
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