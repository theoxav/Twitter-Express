const router = require("express").Router();
const {
  signup,
  signupForm,
  uploadImage,
} = require("../controllers/users.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/signup/form", signupForm);
router.post("/signup", signup);
router.post("/update/image", isAuthenticated, uploadImage);

module.exports = router;
