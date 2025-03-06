import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

mongoose.connect(connectionString)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    console.log(`Using database: ${mongoose.connection.name}`);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Monitor for disconnections
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

// Monitor for reconnections
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

export default mongoose.connection;
