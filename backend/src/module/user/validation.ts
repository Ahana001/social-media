import Joi from 'joi';

export const create_user = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
});

export const update_user = Joi.object({
  id: Joi.string().required(),
  username: Joi.string().trim(),
  password: Joi.string().trim(),
  city: Joi.string().trim(),
  bio: Joi.string().trim(),
  profile_url: Joi.string().trim(),
});

export const login_user = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});
