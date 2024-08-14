const User = require("../database/models/user.model");

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
    throw e;
  }
};

exports.isEmailUnique = async (email) => {
  const user = await User.findOne({ email }).exec();
  return user === null;
};

exports.findUserPerEmail = (email) => {
  return User.findOne({ email }).exec();
};

exports.findUserPerId = (id) => {
  return User.findById(id).exec();
};
