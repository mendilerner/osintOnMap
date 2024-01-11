import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
let uri = process.env.MONGO_DB_URI || "mongodb+srv://orders_db:finalProjectTeam4@cluster0.xymtjg3.mongodb.net/rawNews?retryWrites=true&w=majority"
export async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export async function disconnectFromMongoDB() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }}