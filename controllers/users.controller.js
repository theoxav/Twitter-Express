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
  findUserByEmail,
} = require("../repositories/users.repository");
const { userSchema } = require("../validations/users.validation");
const emailFactory = require("../emails");
const moment = require("moment");
const { v4: uuid } = require("uuid");

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

exports.initResetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await findUserByEmail(email);

      if (user) {
        user.passwordToken = uuid();
        user.passwordTokenExpiration = moment().add(2, "hours").toDate();

        await user.save();

        emailFactory.sendResetPasswordLink({
          to: email,
          host: req.headers.host,
          userId: user._id,
          token: user.passwordToken,
        });
        return res.status(200).end();
      }
    }
    return res.status(400).json("Ici");
  } catch (e) {
    next(e);
  }
};

exports.resetPasswordForm = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const user = await findUserById(userId);

    if (user && user.passwordToken === token) {
      return res.render("auth/auth-reset-password", {
        url: `http://localhost:3001/users/reset-password/${userId}/${token}`,
        errors: null,
        isAuthenticated: false,
      });
    } else {
      return res.status(400).json("Problem during password reset");
    }
  } catch (e) {
    next(e);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    const user = await findUserById(userId);
    if (
      password &&
      user &&
      user.passwordToken === token &&
      moment() < moment(user.passwordTokenExpiration)
    ) {
      user.password = await User.hashPassword(password);
      user.passwordToken = null;
      user.passwordTokenExpiration = null;
      await user.save();
      return res.redirect("/");
    } else {
      return res.render("auth/auth-reset-password", {
        url: `http://localhost:3001/users/reset-password/${userId}/${token}`,
        errors: ["Problem during password reset"],
        isAuthenticated: false,
      });
    }
  } catch (e) {
    next(e);
  }
};
