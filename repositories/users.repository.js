const User = require("../database/models/user.model");

exports.isEmailUnique = async (email) => {
  const user = await User.findOne({ email }).exec();
  return user === null;
};

exports.getUserByEmail = (email) => {
  return User.findOne({ email }).exec();
};

exports.createUser = async (user) => {
  try {
    const hashedPassword = await User.hashPassword(user.password);
    const newUser = new User({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    return newUser.save();
  } catch (e) {
    next(e);
  }
};
