const User = require("../Models/UserSchema");
const constant = require("../Utils/Constant/constant");
const bcrypt = require("bcrypt");
const { loginBodySchema } = require("../Utils/Validation/BodySchema");
const { schemaErrorResponse } = require("../Utils/Error/schemaError");

const adminUserSeed = async (req, res) => {
  //Hash password //
  var hashedPassword = await bcrypt.hash("hk@1211", 10);

  // add user //
  const user = new User({
    name: "Super Admin",
    email: "superadmin@gmail.com",
    password: hashedPassword,
  });
  await user.save();

  res.status(200).json({ message: constant.SUCCESS_MESSAGE.DATA_SAVE });
};

const login = async (req, res) => {
  try {
    const { value, error } = loginBodySchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return schemaErrorResponse({ res, error });
    }

    const user = await User.findByCredentials(value.email, value.password);
    const token = await user.generateAuthToken();

    const userDetails = user.toObject();
    delete userDetails.tokens;

    res.json({
      message: constant.SUCCESS_MESSAGE.LOGIN,
      user: { userDetails, token },
    });
  } catch (err) {
    return res.status(400).send({ requestBodyError: err.requestBodyError });
  }
};

module.exports = { adminUserSeed, login };
