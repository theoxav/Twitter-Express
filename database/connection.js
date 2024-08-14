require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../config/config");

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(config.MONGODB_URI)
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error:", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  getClientPromise() {
    return mongoose.connection
      .asPromise()
      .then(() => mongoose.connection.getClient());
  }
}

module.exports = Database;
