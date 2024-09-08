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
  initResetPassword,
  resetPassword,
  resetPasswordForm,
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
router.post("/forgot-password", initResetPassword);
router.get("/reset-password/:userId/:token", resetPasswordForm);
router.post("/reset-password/:userId/:token", resetPassword);

module.exports = router;
