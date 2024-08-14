const { getUserByEmail } = require("../repositories/users.repository");

exports.signinForm = (req, res, next) => {
  res.render("auth/auth-form", { errors: null });
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.render("auth/auth-form", {
        errors: ["Email ou mot de passe incorrect"],
      });
    }

    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      return res.render("auth/auth-form", {
        errors: ["Email ou mot de passe incorrect"],
      });
    }

    req.session.userId = user._id;
    req.session.username = user.username;

    res.redirect("/tweets");
  } catch (e) {
    next(e);
  }
};

exports.signout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/auth/signin/form");
  });
};
