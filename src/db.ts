import mongoose from "mongoose";
import config from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL);
    console.info("Successfully connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
