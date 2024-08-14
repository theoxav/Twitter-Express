const router = require("express").Router();
const {
  tweetList,
  tweetNew,
  tweetCreate,
  tweetDelete,
  tweetEdit,
  tweetUpdate,
} = require("../controllers/tweets.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", tweetList);
router.get("/new", isAuthenticated, tweetNew);
router.post("/", isAuthenticated, tweetCreate);
router.delete("/:tweetId", isAuthenticated, tweetDelete);
router.get("/edit/:tweetId", isAuthenticated, tweetEdit);
router.post("/update/:tweetId", isAuthenticated, tweetUpdate);

module.exports = router;
