const Joi = require("joi");
const constant = require("../Constant/constant");

const passwordSchema = Joi.string()
  .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  .required()
  .trim()
  .messages({
    "string.pattern.base": constant.VALIDATION.PASSWORD_MESSAGE,
  });

const loginBodySchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: passwordSchema,
});

const firebaseAccountBodySchema = Joi.object({
  appName: Joi.string().required(),
  packageName: Joi.string().required(),
});

const dynamicLinkBodySchema = Joi.object({
  name: Joi.string().required(),
  link: Joi.string().required().uri(),
  image: Joi.string().uri(),
})

module.exports = {
  loginBodySchema,
  firebaseAccountBodySchema,
  dynamicLinkBodySchema
};
