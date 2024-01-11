import {Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input"; // npm i input
import { message } from "telegram/client";
import { NewMessage, NewMessageEvent } from "telegram/events";
import RawNews from './../connectionToDB/newsSchema'
import { connectToMongoDB } from "../connectionToDB/mongooseConnection";
const apiId = 27326517;
const apiHash = "c273aa7bf455ac5b8c1b503cf1051842";
const stringSession = new StringSession("1BAAOMTQ5LjE1NC4xNjcuOTEAUEzf+p3p3Pk4wZIu1O6nrpA0F188vM9vXuiMoptqrbTsvvWkXRJwSmQzJ5c67Dli/qkkQAkE8G0d6FbXhF5BYM8Ar3bIC/IpxA7bIgkCKFytvDZ3es694XS9ds8qRFkuzrGowm5zGdChaSycfBnUpXlCCX9rPhEBHkbiYsTnl6LWrudhrK4ExwjWRf/5s56P65hYzMrYZqJ9+WmtIxsUkeukCrmxsf92xMW+lowghE5XFEtshF3lPY+Tp/njrhki5sBOKM6p+dKCL4fM0H+b400wLxgjgWAflbPKi1FJ77/ELUE3WqRCgKYnI+e1RIxYKMwy1cw9hC1F6gqpEFwGOD0="); // fill this later with the value from session.save()

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await connectToMongoDB()
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: "Hello!" })
  
  async function eventPrint(event: NewMessageEvent) {
    const message = event.message;
    console.log(Object(message.senderId));
    console.log(Object(message.senderId).value);
    const sourceList = [-1001539372881n, -1001387645188n, -1001324507054n]
    if (sourceList.includes(Object(message.senderId).value)){
      const words = message.message.split(/\s+/);
      const first20Words = words.slice(0, 40).join(' ');
      // const lines = message.message.split('\n');
      // const headline = lines[1].trim();
      console.log("title:", message.sender?.title);
      console.log("username:", message.sender?.username);
      console.log("senderID: ", message.senderId);
      console.log("first20Words: ", first20Words);
      console.log("message: ", message.message);
      const newOrder = await RawNews.create({
        source: message.sender?.username,
        body: message.message
      })
    }
    else{
      console.log("outsider senderID: ", message.senderId);
      console.log("message: ", message.message);
    }
    
    // // Checks if it's a private message (from user or bot)
    // if (event.isPrivate){
    //     // prints sender id
    //     console.log(message.senderId);
    //     // read message
    //     if (message.text == "hello"){
    //         const sender = await message.getSender();
    //         console.log("sender is",sender);
    //         await client.sendMessage(sender,{
    //             message:`hi your id is ${message.senderId}`
    //         });
    //     }
    // }
}
// adds an event handler for new messages
client.addEventHandler(eventPrint, new NewMessage({}));
})();

