const Tweet = require("../database/models/tweet.model.js");
exports.checkTweetOwnership = async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.tweetId);

    if (!tweet.author.equals(req.session.userId)) {
      return res
        .status(403)
        .send("Vous n'êtes pas autorisé à effectuer cette action");
    }

    next();
  } catch (e) {
    next(e);
  }
};
