const logger = require('winston');

const Constants = require('../util/constants');
const { Movie } = require('../model/movie');
const GenreRepository = require('../repository/genre_repository');

// Repository to handle Movie data
class MovieRepository {
  constructor() {
    this.genreRepository = new GenreRepository();
  }

  async createMovie(movie) {
    try {
      return await movie.save();
    } catch (err) {
      logger.error('Error occurred while saving Movie data.', err);
      throw new Error('Error occurred while saving Movie data.', err);
    }
  }

  async getMovies(searchTitle, sortField, sortOrder, pageNum) {
    // Default sort by Title
    if (!sortField || !sortOrder) {
      sortField = 'title'
      sortOrder = 1
    }
    let sortObj = {};
    sortObj[sortField] = sortOrder

    if (!pageNum)
      pageNum = 1

    try {
      if (!searchTitle)
        return await Movie.find()
          .sort(sortObj)
          .skip((pageNum - 1) * Constants.PAGE_SIZE)
          .limit(Constants.PAGE_SIZE)
          .select(Constants.HIDDEN_FIELDS);
      else
        return await Movie.find({ title: `/${searchTitle}/` })
          .sort(sortObj)
          .skip((pageNum - 1) * Constants.PAGE_SIZE)
          .limit(Constants.PAGE_SIZE)
          .select(Constants.HIDDEN_FIELDS);
    } catch (err) {
      logger.error('Error occurred while retrieving Movie data.', err);
      throw new Error('Error occurred while retrieving Movie data.', err);
    }
  }

  async getMovieById(id) {
    try {
      return await Movie.findById(id).select(Constants.HIDDEN_FIELDS);
    } catch (err) {
      logger.error('Error occurred while retrieving Movie for Id: ' + id, err);
      throw new Error(
        'Error occurred while retrieving Movie for Id: ' + id,
        err
      );
    }
  }

  async updateMovie(id, payload) {
    try {
      let genre = await this.genreRepository.getGenreById(payload.genreId);

      return await Movie.findByIdAndUpdate(id, {
        $set: {
          title: payload.title,
          genre: {
            _id: genre._id,
            name: genre.name
          },
          numberInStock: payload.numberInStock,
          dailyRentalRate: payload.dailyRentalRate,
          updatedBy: payload.updatedBy
        },
        $currentDate: {
          updatedAt: 1
        }
      });
    } catch (err) {
      logger.error('Error occurred while updating Movie for Id: ' + id, err);
      throw new Error('Error occurred while updating Movie for Id: ' + id, err);
    }
  }

  async deleteMovie(id) {
    try {
      return await Movie.findByIdAndRemove(id);
    } catch (err) {
      logger.error('Error occurred while deleting Movie for Id: ' + id, err);
      throw new Error('Error occurred while deleting Movie for Id: ' + id, err);
    }
  }
}

module.exports = MovieRepository;
