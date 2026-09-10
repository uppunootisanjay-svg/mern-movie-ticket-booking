const mongoose = require('mongoose');

const ATLAS_FALLBACK_URI = 'mongodb+srv://uppunootisanjay_db_user:80op7i0wzU8JcfOn@cluster0.dztdnnf.mongodb.net/movie_booking_db?retryWrites=true&w=majority';

const connectDB = async () => {
  const uri = process.env.MONGO_URI || ATLAS_FALLBACK_URI;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.log('Retrying MongoDB connection in 5 seconds...');
    // Retry connection without crashing the Express server
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
