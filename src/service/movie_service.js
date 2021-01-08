const { Movie } = require('../model/movie');
const MovieRepository = require('../repository/movie_repository');
// const GenreRepository = require('../repository/genre_repository');
const UserRepository = require('../repository/user_repository');

const _buildMovie = Symbol();

// Service layer for Movie related operations
class MovieService {
  constructor() {
    this.movieRepository = new MovieRepository();
    // this.genreRepository = new GenreRepository();
    this.userRepository = new UserRepository();
  }

  async createMovie(payload, user) {
    try {
      let genre = await this.movieRepository.genreRepository.getGenreById(payload.genreId);

      let movie = await this[_buildMovie](payload, genre, user.email);
      return await this.movieRepository.createMovie(movie);
    } catch (err) {
      throw err;
    }
  }

  async getMovies(searchTitle, sortField, sortOrder, pageNum) {
    try {
      return await this.movieRepository.getMovies(
        searchTitle,
        sortField,
        sortOrder,
        pageNum
      );
    } catch (err) {
      throw err;
    }
  }

  async getMovieById(id) {
    try {
      return await this.movieRepository.getMovieById(id);
    } catch (err) {
      throw err;
    }
  }

  async updateMovie(id, payload, user) {
    try {
      payload.updatedBy = await this.userRepository.getUserIdByEmail(user.email);
      return await this.movieRepository.updateMovie(id, payload);
    } catch (err) {
      throw err;
    }
  }

  async deleteMovie(id) {
    try {
      return await this.movieRepository.deleteMovie(id);
    } catch (err) {
      throw err;
    }
  }

  async [_buildMovie](payload, genre, email) {
    let movie = new Movie({
      title: payload.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: payload.numberInStock,
      dailyRentalRate: payload.dailyRentalRate
    });

    try {
      let userId = await this.userRepository.getUserIdByEmail(email);
      movie.createdBy = userId;
      movie.updatedBy = userId;
      return movie;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MovieService;
