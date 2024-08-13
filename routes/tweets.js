const router = require("express").Router();
const {
  tweetList,
  tweetNew,
  tweetCreate,
} = require("../controllers/tweets.controller");

router.get("/", tweetList);
router.get("/new", tweetNew);
router.post("/", tweetCreate);

module.exports = router;
