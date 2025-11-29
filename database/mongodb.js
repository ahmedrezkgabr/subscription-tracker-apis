import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
  throw new Error(
    'Please define the DB_URI environment variable inside .env.development.local or .env.production.local file'
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    if (NODE_ENV !== 'test') {
      console.log('MongoDB connected successfully in ', NODE_ENV, 'mode');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
