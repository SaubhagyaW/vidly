const mongoose = require('mongoose');
const Joi = require('joi');

const { Genre } = require('./genre');

// Request validation schema for Movie
const movieSchema_joi = Joi.object({
    title: Joi.string().required().min(0).max(255).trim(true),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required().min(0),
    dailyRentalRate: Joi.number().required().min(0)
});

function validateMovie(body) {
    return movieSchema_joi.validate(body);
}


// ----------------------------------------------------------------
// ==== THEORY ====
// There are 2 Approaches to model relationships between documents;
//      1. Referencing dcouments -> Ensures Data CONSISTANCY
//      2. Embedding documents -> Improves PERFORMANCE
// 
// 2nd Approach can be used for;
//      - Values which won't be usually changed.
//          Ex: Customer name, Genre name, Movie title. 
//      - Snapshot information.
//          Ex: Customer information in a payment receipt.
//              (This information is unlikely to be updated)
// * It's always a good idea to make these fields "immutable" so that it's read-only.
// ----------------------------------------------------------------


// DB validation schema for Movie
// A Hybrid approach between the above 2 approaches is used in this Project.
// i.e. maintaining a reference to the sub-document while maintaining few necessary properties embedded
// in order to improve performance.
const movieSchema_mongoose = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: new mongoose.Schema({
            _id: {
                type: String,
                required: true,
                validate: {
                    validator: function (val) {
                        return new Promise((resolve, reject) => {
                            Genre.findById(val)
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
            }
        }),
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Movie model
const Movie = mongoose.model('Movie', movieSchema_mongoose);

exports.Movie = Movie;
exports.validate = validateMovie;
