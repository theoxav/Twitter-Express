const upload = require("../config/multer");
const User = require("../database/models/user.model");
const {
  getUserTweetsFormAuthorId,
} = require("../repositories/tweets.repository");
const {
  createUser,
  isEmailUnique,
  findUserByUsername,
  searchUsersByUsername,
} = require("../repositories/users.repository");
const { userSchema } = require("../validations/users.validation");

exports.userProfile = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await findUserByUsername(username);
    const tweets = await getUserTweetsFormAuthorId(user._id);

    res.render("tweets/tweet", {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user,
      editable: false,
    });
  } catch (e) {
    next(e);
  }
};

exports.userList = async (req, res, next) => {
  try {
    const search = req.query.search;
    const users = await searchUsersByUsername(search);
    res.render("includes/search-menu", { users });
  } catch (e) {
    next(e);
  }
};

exports.signupForm = (req, res, next) => {
  res.render("users/user-form", {
    errors: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
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
    res.render("users/user-form", {
      errors: [e.message],
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

exports.uploadImage = [
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      user.avatar = `/images/avatars/${req.file.filename}`;
      await user.save();
      res.redirect("/");
    } catch (e) {
      next(e);
    }
  },
];
