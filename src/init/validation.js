const Joi = require('joi');

// Request validations
module.exports = function () {
    Joi.objectId = require('joi-objectid')(Joi);
};
