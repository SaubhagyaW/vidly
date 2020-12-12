const mongoose = require('mongoose');
const Joi = require('joi');
const joiPasswordComplexity = require("joi-password-complexity");

const pwdCriteria = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

function validateUser(body) {
    // Request validation schema for User
    const userSchema_joi = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(50),
        password: Joi.string().required(),
        admin: Joi.boolean()
    });

    // return userSchema_joi.validate(body)
    //     && joiPasswordComplexity(pwdCriteria).validate(body.password);

    return userSchema_joi.validate(body);
}

// DB validation schema for User
const userSchema_mongoose = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        // minlength: 6,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// User model
const User = mongoose.model('User', userSchema_mongoose);

exports.User = User;
exports.validate = validateUser;
