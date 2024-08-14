const router = require("express").Router();
const tweetsRoutes = require("./tweets");
const usersRoutes = require("./users");
const authRoutes = require("./auth");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.use("/tweets", isAuthenticated, tweetsRoutes);
router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

router.get("/", (req, res) => {
  res.redirect("/tweets");
});

module.exports = router;
