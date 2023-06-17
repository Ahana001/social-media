import Joi from 'joi';

export const id = Joi.object({
  id: Joi.string().required(),
});
