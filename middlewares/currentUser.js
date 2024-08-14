const User = require("../database/models/user.model");

const currentUser = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId).exec();
      if (user) {
        res.locals.user = {
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        };
      } else {
        res.locals.user = null;
      }
    } catch (err) {
      console.error(`Error fetching user data: ${err.message}`);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
};

module.exports = currentUser;
