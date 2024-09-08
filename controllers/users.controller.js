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
  findUserById,
  removeUserIdToCurrentUserFollowing,
  addUserIdToCurrentUserFollowing,
} = require("../repositories/users.repository");
const { userSchema } = require("../validations/users.validation");
const emailFactory = require("../emails");

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

  const { error } = userSchema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).render("users/user-form", { errors });
  }
  try {
    const isUnique = await isEmailUnique(body.email);
    if (!isUnique) {
      return res.status(400).render("users/user-form", {
        errors: ["Email déjà utilisé. Veuillez en choisir un autre."],
      });
    }
    const user = await createUser(body);
    emailFactory.sendEmailVerification({
      to: user.email,
      host: req.headers.host,
      username: user.username,
      userId: user._id,
      token: user.emailToken,
    });
    res.redirect("/auth/signin/form");
  } catch (e) {
    res.status(400).render("users/user-form", {
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

exports.followUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      addUserIdToCurrentUserFollowing(req.user, userId),
      findUserById(userId),
    ]);
    res.redirect(`/users/${user.username}`);
  } catch (e) {
    next(e);
  }
};

exports.unFollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([
      removeUserIdToCurrentUserFollowing(req.user, userId),
      findUserById(userId),
    ]);
    res.redirect(`/users/${user.username}`);
  } catch (e) {
    next(e);
  }
};

exports.emailLinkVerification = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const user = await findUserById(userId);

    if (user && token && token === user.emailToken) {
      user.emailVerified = true;
      await user.save();
      return res.redirect("/");
    } else {
      return res.status(400).json("Problem during email verification");
    }
  } catch (e) {
    next(e);
  }
};
