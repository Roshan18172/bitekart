const mongoose = require('mongoose');
const dbURI = 'mongodb://roshanpal18172:rpal%40123@ac-rr94adj-shard-00-00.jx2f8hv.mongodb.net:27017,ac-rr94adj-shard-00-01.jx2f8hv.mongodb.net:27017,ac-rr94adj-shard-00-02.jx2f8hv.mongodb.net:27017/bitekart?ssl=true&replicaSet=atlas-bre33u-shard-0&authSource=admin&retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;
