const { createUser } = require("../repositories/users.repository");

exports.signupForm = (req, res, next) => {
  res.render("users/user-form", { errors: null });
};

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect("/");
  } catch (e) {
    res.render("users/user-form", { errors: [e.message] });
  }
};
