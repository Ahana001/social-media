import Joi from 'joi';

export const create_post = Joi.object({
  content: Joi.string().trim().required(),
  picture: Joi.any(),
});

export const update_post = Joi.object({
  id: Joi.string().required(),
  content: Joi.string().trim().required(),
  picture: Joi.any(),
});
