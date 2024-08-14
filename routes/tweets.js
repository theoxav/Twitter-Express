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
router.get("/new", isAuthenticated, tweetNew);
router.post("/", isAuthenticated, tweetCreate);
router.delete("/:tweetId", isAuthenticated, checkTweetOwnership, tweetDelete);
router.get("/edit/:tweetId", isAuthenticated, checkTweetOwnership, tweetEdit);
router.post("/update/:tweetId", isAuthenticated, checkTweetOwnership, tweetUpdate);

module.exports = router;
