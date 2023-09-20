const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const constant = require("../Utils/Constant/constant");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: constant.VALIDATION.EMAIL_INVALID_MESSAGE,
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
      const error = new Error(constant.ERROR_MESSAGE.EMAIL_NOT_EXISTS_MESSAGE);
      error.requestBodyError = {
          email: constant.ERROR_MESSAGE.EMAIL_NOT_EXISTS_MESSAGE,
      };
      throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      const error = new Error(constant.VALIDATION.CREDENTIAL_NOT_MATCH_MESSAGE);
      error.requestBodyError = {
          password: constant.VALIDATION.CREDENTIAL_NOT_MATCH_MESSAGE,
      };
      throw error;
  }
  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens.push({ token });
  await user.save();
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
