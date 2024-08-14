const {
  createUser,
  isEmailUnique,
} = require("../repositories/users.repository");
const { userSchema } = require("../validations/users.validation");

exports.signupForm = (req, res, next) => {
  res.render("users/user-form", { errors: null });
};

exports.signup = async (req, res, next) => {
  const body = req.body;

  const { error } = userSchema.validate(body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.render("users/user-form", { errors });
  }
  try {
    const isUnique = await isEmailUnique(body.email);
    if (!isUnique) {
      return res.render("users/user-form", {
        errors: ["Email déjà utilisé. Veuillez en choisir un autre."],
      });
    }
    const user = await createUser(body);
    res.redirect("/auth/signin/form");
  } catch (e) {
    res.render("users/user-form", { errors: [e.message] });
  }
};
