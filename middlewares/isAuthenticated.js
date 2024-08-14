module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("User is not authenticated");

    res.redirect("/auth/signin/form");
  }
};
