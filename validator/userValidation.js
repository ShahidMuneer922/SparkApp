/** @format */

import Joi from "joi";

export const validateUser = async (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      "string.min": "Username must be at least {#limit} characters",
      "string.max": "Username must be at most {#limit} characters",
      "any.required": "Username is required",
    }),
    email: Joi.string().required().email().messages({
      "any.required": "Email is required",
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string().min(3).max(255).required().messages({
      "string.min": "Password must be at least {#limit} characters",
      "string.max": "Password must be at most {#limit} characters",
      "any.required": "Password is required",
    }),
  });

  try {
    await schema.validateAsync(user);
  } catch (error) {
    throw new Error(error.details[0].message.replace(/"/g, ""));
  }
};

export const validateLogin = async (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required().messages({
      "string.min": "Username must be at least {#limit} characters",
      "string.max": "Username must be at most {#limit} characters",
      "any.required": "Username is required",
    }),
    password: Joi.string().min(3).max(255).required().messages({
      "string.min": "Password must be at least {#limit} characters",
      "string.max": "Password must be at most {#limit} characters",
      "any.required": "Password is required",
    }),
  });

  try {
    await schema.validateAsync(user);
  } catch (error) {
    throw new Error(error.details[0].message.replace(/"/g, ""));
  }
};

export const validateDeleteUser = async (user) => {
  const schema = Joi.object({
    id: Joi.string().required().messages({
      "any.required": "User ID is required",
    }),
  });

  try {
    await schema.validateAsync(user);
  } catch (error) {
    throw new Error(error.details[0].message.replace(/"/g, ""));
  }
};
