const mongoose = require('mongoose');
const Joi = require('joi');

// Request validation schema for Genre
const genreSchema_joi = Joi.object({
    name: Joi.string().required().min(5).max(50)
});

function validateGenre(body) {
    return genreSchema_joi.validate(body);
}

// DB validation schema for Genre
const genreSchema_mongoose = new mongoose.Schema({
    // FIX-ME: Make name immutable
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Genre model
const Genre = mongoose.model('Genre', genreSchema_mongoose);

exports.genreSchema_mongoose = genreSchema_mongoose;
exports.Genre = Genre;
exports.validate = validateGenre;

// module.exports = {
//     genreSchema_mongoose: genreSchema_mongoose,
//     Genre: Genre,
//     validate: validateGenre
// };
