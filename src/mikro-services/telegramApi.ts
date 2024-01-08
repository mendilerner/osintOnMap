import {Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import input from "input"; // npm i input
import { message } from "telegram/client";
import { NewMessage, NewMessageEvent } from "telegram/events";

const apiId = 112732651723;
const apiHash = "c273aa7bf455ac5b8c1b503cf1051842";
const stringSession = new StringSession(""); // fill this later with the value from session.save()

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
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
    console.log(message.message);
    console.log(message.senderId);
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


