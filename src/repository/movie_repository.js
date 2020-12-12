const { PAGE_SIZE, HIDDEN_FIELDS } = require('../util/constants');
const { Movie } = require('../model/movie');

// Repository to handle Movie data
class MovieRepository {
    async createMovie(movie) {
        try {
            return await movie.save();
        } catch (err) {
            console.error('Error occurred while saving Movie data.', err);
            throw new Error('Error occurred while saving Movie data.', err);
        }
    }

    async getMovies(pageNum) {
        try {
            return await Movie
                .find()
                .skip((pageNum - 1) * PAGE_SIZE)
                .limit(PAGE_SIZE)
                .sort('name')
                .select(HIDDEN_FIELDS);
        } catch (err) {
            console.error('Error occurred while retrieving Movie data.', err);
            throw new Error('Error occurred while retrieving Movie data.', err);
        }
    }

    async getMovieById(id) {
        try {
            return await Movie
                .findById(id)
                .select(HIDDEN_FIELDS);
        } catch (err) {
            console.error('Error occurred while retrieving Movie for Id: ' + id, err);
            throw new Error('Error occurred while retrieving Movie for Id: ' + id, err);
        }
    }

    async updateMovie(id, payload) {
        try {
            let genre = await genreRepository.getGenreById(payload.genreId);

            return await Movie.findByIdAndUpdate(id, {
                $set: {
                    title: payload.title,
                    genre: {
                        _id: genre._id,
                        name: genre.name
                    },
                    numberInStock: payload.numberInStock,
                    dailyRentalRate: payload.dailyRentalRate
                },
                $currentDate: {
                    updatedAt: 1
                }
            });
        } catch (err) {
            console.error('Error occurred while updating Movie for Id: ' + id, err);
            throw new Error('Error occurred while updating Movie for Id: ' + id, err);
        }
    }

    async deleteMovie(id) {
        try {
            return await Movie.findByIdAndRemove(id);
        } catch (err) {
            console.error('Error occurred while deleting Movie for Id: ' + id, err);
            throw new Error('Error occurred while deleting Movie for Id: ' + id, err);
        }
    }
}

module.exports = MovieRepository;
