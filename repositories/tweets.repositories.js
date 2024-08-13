const Tweet = require("../database/models/tweet.model");

exports.getTweets = () => {
  return Tweet.find({}).exec();
};

exports.createTweet = (tweet) => {
  const newTweet = new Tweet(tweet);
  return newTweet.save();
};

exports.deleteTweet = (tweetId) => {
  return Tweet.findByIdAndDelete(tweetId);
};
