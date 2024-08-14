const mongoose = require("mongoose");
const User = require("../database/models/user.model");
const Tweet = require("../database/models/tweet.model");
const Database = require("../database/connection");

Database.getInstance();

const tweetsData = [
  { content: "Hello world from John!", username: "john_doe" },
  { content: "This is a tweet from Jane!", username: "jane_smith" },
  { content: "Alice shares her thoughts here.", username: "alice_jones" },
];

async function seedTweets() {
  try {
    await Tweet.deleteMany({});

    const users = await User.find({});

    const tweetsWithAuthors = tweetsData.map((tweetData) => {
      const author = users.find((user) => user.username === tweetData.username);
      return { ...tweetData, author: author._id };
    });

    await Tweet.insertMany(tweetsWithAuthors);

    console.log("Tweets créés avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création des tweets :", error);
  } finally {
    mongoose.connection.close();
  }
}

seedTweets();
