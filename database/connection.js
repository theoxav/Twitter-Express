require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../config/config");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(config.MONGODB_URI);
    isConnected = true;
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
