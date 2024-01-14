import {Api, TelegramClient} from 'telegram';
import {StringSession} from 'telegram/sessions';

const session = new StringSession('');
const client = new TelegramClient(session, 27326517, 'c273aa7bf455ac5b8c1b503cf1051842', {});
(async function run() {
  const result: Api.messages.Messages = await client.invoke(new Api.channels.GetMessages({
      channel: new Api.InputChannel({...}),
      id: [new Api.InputMessageID({...})],
      }));
  console.log(result); // prints the result
})();

// import { getJson }  from 'serpapi'
// const a = async () => {const trends = await getJson({
//     engine: "google_trends_trending_now",
//     api_key: "db333d4a901c07b16f37604fbc896b1ab9fca341b6569bcc7c8c5cfcc90d8d9a",
//     frequency: "daily",
//     geo: "US",
//     hl: "en",
//     date: new Date().toISOString().replaceAll("-", "").split("T"),
//   });
//   console.log(trends.daily_searches[0].searches);}

//   a()