// server/config/connection.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Use environment variable for MongoDB URI if available
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

// Improved connection handling
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => {
    console.error('MongoDB connection error details:', err);
    // Log more details about the connection attempt
    console.log('Attempted connection URI:', 
      mongoURI.replace(/mongodb(\+srv)?:\/\/[^:]+:[^@]+@/, 'mongodb$1://****:****@'));
  });

export default mongoose.connection;
