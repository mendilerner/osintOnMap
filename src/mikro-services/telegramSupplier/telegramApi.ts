import {Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import axios from 'axios';
import kafka from '../../kafka/kafkaInstance'
import input from "input"; // npm i input
import { message } from "telegram/client";
import { NewMessage, NewMessageEvent } from "telegram/events";

const apiId = 27326517;
const apiHash = "c273aa7bf455ac5b8c1b503cf1051842";
const stringSession = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUEzf+p3p3Pk4wZIu1O6nrpA0F188vM9vXuiMoptqrbTsvvWkXRJwSmQzJ5c67Dli/qkkQAkE8G0d6FbXhF5BYM8Ar3bIC/IpxA7bIgkCKFytvDZ3es694XS9ds8qRFkuzrGowm5zGdChaSycfBnUpXlCCX9rPhEBHkbiYsTnl6LWrudhrK4ExwjWRf/5s56P65hYzMrYZqJ9+WmtIxsUkeukCrmxsf92xMW+lowghE5XFEtshF3lPY+Tp/njrhki5sBOKM6p+dKCL4fM0H+b400wLxgjgWAflbPKi1FJ77/ELUE3WqRCgKYnI+e1RIxYKMwy1cw9hC1F6gqpEFwGOD0="); // fill this later with the value from session.save()

const producer = kafka.producer();

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await producer.connect();
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); 
  await client.sendMessage("me", { message: "Hello!" })
  
  async function eventPrint(event: NewMessageEvent) {
    const message = event.message;
    const sourceList = [-1001539372881n, -1001387645188n, -1001324507054n]
    if (sourceList.includes(Object(message.senderId).value)){
      const now = new Date();
      // const options = { timeZone: 'Asia/Jerusalem' };
      // const israelTimeISOString = now.toLocaleString('en-US', options);
      // const currentDate = new Date()//Number(new Date()) + 1000 * 3600 * 2
       const formattedDate = now.toISOString();
      if (message.message.length > 20){
      const rawNews = {source: message.sender?.username, rawNews: message.message ,time: formattedDate}
      try {
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
    }
    else{
      console.log("outsider senderID: ", message.senderId);
      console.log("message: ", message.message);
    }
}
client.addEventHandler(eventPrint, new NewMessage({}));
})();

