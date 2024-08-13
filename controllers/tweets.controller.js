const Tweet = require("../database/models/tweet.model");
const {
  createTweet,
  getTweets,
  deleteTweet,
} = require("../repositories/tweets.repositories");

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets();
    res.render("tweets/tweet", { tweets });
  } catch (e) {
    next(e);
  }
};

exports.tweetNew = (req, res, next) => {
  res.render("tweets/tweet-form");
};

exports.tweetCreate = async (req, res, next) => {
  try {
    const body = req.body;
    await createTweet(body);
    res.redirect("/tweets");
  } catch (e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    res.status(400).render("tweets/tweet-form", { errors });
  }
};

exports.tweetDelete = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    await deleteTweet(tweetId);

    const tweets = await getTweets();
    res.render("tweets/tweet-list", { tweets });
  } catch (e) {
    next(e);
  }
};
