const Tweet = require("../database/models/tweet.model");

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await Tweet.find({}).exec();
    res.render("tweets/tweet-list", { tweets });
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
    const newTweet = new Tweet(body);
    await newTweet.save();
    res.redirect("/tweets");
  } catch (e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    res.status(400).render("tweets/tweet-form", { errors });
  }
};
