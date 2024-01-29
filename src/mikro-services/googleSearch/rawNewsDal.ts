import { number } from "joi";
import RawNews from "../../connectionToDB/newsSchema";
import { connectToMongoDB } from "../../connectionToDB/mongooseConnection";
import { now } from "mongoose";

export const getLastNews = async (lastHoursAgo: number) => {
    const currentDate = new Date();
    const HoursAgo = new Date(Number(currentDate) - lastHoursAgo * 60 * 60 * 1000); 
    console.log(HoursAgo.toISOString())
    const latestNews = await RawNews.find({
        $or: [
            {
                "time": {
                    $gte: HoursAgo.toISOString(),
                    $lt: currentDate.toISOString()
                }
            },
            {
                'updatedAt': {
                    $gte: HoursAgo.toISOString(),
                    $lt: currentDate.toISOString() 
                }
            }
        ],
        matchTo: { $exists: false },
        coordinates: { $exists: true},
        literalLocation: { $exists: true}
    }).sort({ "time": -1, "updatedAt": -1 });
    console.log(latestNews.length);
    //console.log(latestNews);
    return latestNews

}
// connectToMongoDB().then(() => {
//     getLastNews(2).then(() => {
//         getLastNews(8)
//     })
    
// })
// const currentDate = new Date()//Number(new Date()) + 1000 * 3600 * 2
// const formattedDate = currentDate.toISOString();

// console.log(formattedDate);