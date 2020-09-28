const mongoose = require('mongoose');
const config = require('config');
const MongoURI = config.get('MongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(MongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
