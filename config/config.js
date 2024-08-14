require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGODB_URI;

const SESSION_SECRET = process.env.SESSION_SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  SESSION_SECRET,
};
