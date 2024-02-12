import { connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
export const connectToDb = async () => {
  try {
    // await connect(process.env.MONGO_URL);
    await connect(process.env.MONGO_PRODUCTION);
  } catch (error) {
    console.log("can't connect to the database");
  }
};
