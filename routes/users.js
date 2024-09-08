const router = require("express").Router();
const {
  signup,
  signupForm,
  uploadImage,
  userProfile,
  userList,
  followUser,
  unFollowUser,
  emailLinkVerification,
} = require("../controllers/users.controller");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", userList);
router.get("/follow/:userId", followUser);
router.get("/unfollow/:userId", unFollowUser);
router.get("/:username", userProfile);
router.get("/signup/form", signupForm);
router.post("/signup", signup);
router.post("/update/image", isAuthenticated, uploadImage);
router.get("/email-verification/:userId/:token", emailLinkVerification);

module.exports = router;
