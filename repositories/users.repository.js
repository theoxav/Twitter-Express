const User = require("../database/models/user.model");
const escapeRegExp = require("../utils/regExp");

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

exports.findUserByEmail = (email) => {
  return User.findOne({ email }).exec();
};

exports.findUserById = (id) => {
  return User.findById(id).exec();
};

exports.findUserByUsername = (username) => {
  return User.findOne({ username }).exec();
};

exports.searchUsersByUsername = (search) => {
  const escapedSearch = escapeRegExp(search);
  const regExp = `^${escapedSearch}`;
  const reg = new RegExp(regExp);
  return User.find({ username: { $regex: reg } }).exec();
};

exports.addUserIdToCurrentUserFollowing = (currentUser, userId) => {
  currentUser.following = [...currentUser.following, userId];
  return currentUser.save();
};

exports.removeUserIdToCurrentUserFollowing = (currentUser, userId) => {
  currentUser.following = currentUser.following.filter(
    (objectId) => objectId.toString() !== userId
  );
  return currentUser.save();
};
