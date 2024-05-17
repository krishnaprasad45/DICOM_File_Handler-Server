import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const mongoUrl = process.env.MONGO_URL
// const mongoUrl ='mongodb+srv://superadmin:admin123@cluster0.wb9j1wz.mongodb.net/DICOMDATABASE?retryWrites=true&w=majority&appName=Cluster0'
const connectDB = async () => {
  try {
    if(mongoUrl)await mongoose.connect(mongoUrl);
    console.log("database connected");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
