import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGO_URI environment variable");
}

async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB Connected!");
  } catch (error) {
    console.log(error);
  }
}
export default dbConnect;
