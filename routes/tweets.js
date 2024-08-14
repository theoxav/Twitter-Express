const router = require("express").Router();
const {
  tweetList,
  tweetNew,
  tweetCreate,
  tweetDelete,
  tweetEdit,
  tweetUpdate,
} = require("../controllers/tweets.controller");
const { checkTweetOwnership } = require("../middlewares/checkTweetOwnership");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", tweetList);
router.get("/new", tweetNew);
router.post("/", tweetCreate);
router.delete("/:tweetId", checkTweetOwnership, tweetDelete);
router.get("/edit/:tweetId", checkTweetOwnership, tweetEdit);
router.post("/update/:tweetId", checkTweetOwnership, tweetUpdate);

module.exports = router;
