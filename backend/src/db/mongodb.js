import mongoose from 'mongoose';
import { config } from '../config.js';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log(' MongoDB connected');
  } catch (err) {
    console.error(' MongoDB connection failed:', err.message);
    process.exit(1);
  }
};


export default mongoose;
