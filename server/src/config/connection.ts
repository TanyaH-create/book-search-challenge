import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Use environment variable for MongoDB connection string with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/googlebooks';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

export default mongoose.connection;
