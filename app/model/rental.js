const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const { Movie } = require('./movie');
const { Customer } = require('./customer');

// Request validation schema for Rental
const rentalSchema_joi = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
});

function validateRental(body) {
    return rentalSchema_joi.validate(body);
}

// DB validation schema for Rental
const rentalSchema_mongoose = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            _id: {
                type: String,
                required: true,
                validate: {
                    validator: function (val) {
                        return new Promise((resolve, reject) => {
                            Customer.findById(val)
                                .then(result => resolve(result))
                                .catch(err => reject(err));
                        });
                    }
                }
            },
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
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            _id: {
                type: String,
                required: true,
                validate: {
                    validator: function (val) {
                        return new Promise((resolve, reject) => {
                            Movie.findById(val)
                                .then(result => resolve(result))
                                .catch(err => reject(err));
                        });
                    }
                }
            },
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255,
                trim: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now
    },
    dateReturned: Date,
    rentalFee: {
        type: Number,
        min: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Rental model
const Rental = mongoose.model('Rental', rentalSchema_mongoose);

exports.Rental = Rental;
exports.validate = validateRental;
