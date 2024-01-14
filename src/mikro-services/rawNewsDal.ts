import { number } from "joi";
import RawNews from "../connectionToDB/newsSchema";
import { connectToMongoDB } from "../connectionToDB/mongooseConnection";
import { now } from "mongoose";

export const getLastNews = async (lasthHoursAgo: number) => {
    const currentDate = new Date();
    const HoursAgo = new Date(Number(currentDate) - lasthHoursAgo * 60 * 60 * 1000); // Subtract 6 hours in milliseconds
    console.log(HoursAgo.toISOString())
    // const latestNews = await RawNews.aggregate([
    //   {
    //     $match: {
    //       $expr: {
    //         $gte: [
    //             {
    //               $dateFromString: {
    //                 dateString: "$timeA",
    //                 format: "%m/%d/%Y, %I:%M:%S %p"
    //               }
    //             },
    //             sixHoursAgo
    //           ]
    //       }
    //     }
    //   }
    // ]);
    const latestNews = await RawNews.find({
        "timeA": {
            $gte: HoursAgo.toISOString(), // Convert date to string for comparison
            $lt: currentDate.toISOString()
        }
    });
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