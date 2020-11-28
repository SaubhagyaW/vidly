const { Movie } = require('../model/movie');
const MovieRepository = require('../repository/movie_repository');
const GenreRepository = require('../repository/genre_repository');

const movieRepository = new MovieRepository();
const genreRepository = new GenreRepository();

const _buildMovie = Symbol();

// Service layer for Movie related operations
class MovieService {
    async createMovie(payload) {
        try {
            let genre = await genreRepository.getGenreById(payload.genreId);

            let movie = this[_buildMovie](payload, genre);
            return await movieRepository.createMovie(movie);
        } catch (err) {
            throw err;
        }
    }

    async getMovies(pageNum) {
        try {
            return await movieRepository.getMovies(pageNum);
        } catch (err) {
            throw err;
        }
    }

    async getMovieById(id) {
        try {
            return await movieRepository.getMovieById(id);
        } catch (err) {
            throw err;
        }
    }

    async updateMovie(id, payload) {
        try {
            return await movieRepository.updateMovie(id, payload);
        } catch (err) {
            throw err;
        }
    }

    async deleteMovie(id) {
        try {
            return await movieRepository.deleteMovie(id);
        } catch (err) {
            throw err;
        }
    }

    [_buildMovie](payload, genre) {
        return new Movie({
            title: payload.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: payload.numberInStock,
            dailyRentalRate: payload.dailyRentalRate
        });
    }
}

module.exports = MovieService;
