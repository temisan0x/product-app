const Joi = require("joi");

const passwordPattern = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"
);

const signupSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .message("First name must contain only letters")
    .required()
    .messages({
      "string.empty": "First name is required",
    }),

  lastName: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[a-zA-Z]+$/)
    .message("Last name must contain only letters")
    .required()
    .messages({
      "string.empty": "Last name is required",
    }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),

  password: Joi.string()
    .pattern(passwordPattern)
    .message(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": "Confirm password is required",
    "any.only": "Passwords do not match",
  }),
});

const signinSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

module.exports = {
  signupSchema,
  signinSchema,
};
