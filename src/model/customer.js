const mongoose = require('mongoose');
const Joi = require('joi');

function validateCustomer(body) {
    // Request validation schema for Customer
    const customerSchema_joi = Joi.object({
        name: Joi.string().required().min(5).max(50),
        phone: Joi.string().required().min(9).max(10),
        isGold: Joi.boolean()
    });

    return customerSchema_joi.validate(body);
}

// DB validation schema for Customer
const customerSchema_mongoose = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10
    },
    isGold: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Customer model
const Customer = mongoose.model('Customer', customerSchema_mongoose);

exports.Customer = Customer;
exports.validate = validateCustomer;
