import { Joi } from "celebrate";

export const validateProduct = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  image: Joi.object().keys({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().allow(null),
});

export const validateOrder = Joi.object({
  payment: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().items(Joi.string().required()).required(),
});