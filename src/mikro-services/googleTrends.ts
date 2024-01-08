
import { getJson }  from 'serpapi'
const a = async () => {const trends = await getJson({
    engine: "google_trends_trending_now",
    api_key: "db333d4a901c07b16f37604fbc896b1ab9fca341b6569bcc7c8c5cfcc90d8d9a",
    frequency: "daily",
    geo: "US",
    hl: "en",
    date: new Date().toISOString().replaceAll("-", "").split("T"),
  });
  console.log(trends.daily_searches[0].searches);}

  a()