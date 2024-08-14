const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = schema({
  username: {
    type: String,
    required: [true, "Le champ 'username' est requis"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Le champ 'email' est requis"],
    unique: [true, "Veuillez entrer une autre email"],
  },
  password: {
    type: String,
    required: [true, "Le champ 'password' est requis"],
  },
  avatar: { type: String, default: "images/default-profile.svg" },
  following: { type: [schema.Types.ObjectId], ref: "user" },
});

userSchema.statics.hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
