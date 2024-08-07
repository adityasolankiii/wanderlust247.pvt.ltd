const Joi = require("joi"); //Schema validator

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
    category: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required(),
  }).required(),
});

module.exports.reserveSchema = Joi.object({
  reserve: Joi.object({
    checkin: Joi.date().required(),
    checkout: Joi.date().required(),
    adult: Joi.number().required().min(1).max(4),
    children: Joi.number().min(0).max(2),
    mobile: Joi.number().required(),
    total: Joi.number().required(),
    identity: Joi.string().required(),
  }).required(),
});

//Not Used
module.exports.paymentSchema = Joi.object({
  payment: Joi.object({
    orderId: Joi.string().required(),
    paymentId: Joi.string().required(),
    amount: Joi.number().required(),
    status: Joi.string().required(),
    method: Joi.string().required(),
  }),
});

//Not Used
module.exports.refundSchema = Joi.object({
  refund: Joi.object({
    refundId: Joi.string().required(),
    amount: Joi.number().required(),
    status: Joi.string().required(),
  }),
});
