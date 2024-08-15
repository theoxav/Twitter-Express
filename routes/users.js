const router = require("express").Router();
const {
  signup,
  signupForm,
  uploadImage,
  userProfile,
  userList,
} = require("../controllers/users.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", userList);
router.get("/:username", userProfile);
router.get("/signup/form", signupForm);
router.post("/signup", signup);
router.post("/update/image", isAuthenticated, uploadImage);

module.exports = router;
