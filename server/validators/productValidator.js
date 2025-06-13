const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(500),
  price: Joi.number().required().min(0.01).max(1000000.00),
  image: Joi.string().uri(),
  quantity: Joi.number().required().integer().min(0).max(10000),
});

module.exports = {
  productSchema
};
