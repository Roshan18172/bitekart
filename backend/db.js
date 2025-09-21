const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/bitekart?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

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
