const logger = require('winston');

const Constants = require('../util/constants');
const { Genre } = require('../model/genre');

// Repository to handle Genre data
module.exports = class GenreRepository {
  async createGenre(genre) {
    try {
      return await genre.save();
    } catch (err) {
      logger.error('Error occurred while saving Genre data.', err);
      throw new Error('Error occurred while saving Genre data.', err);
    }
  }

  async getGenres(pageNum) {
    try {
      return await Genre.find()
        .skip((pageNum - 1) * Constants.PAGE_SIZE)
        .limit(Constants.PAGE_SIZE)
        .sort('name')
        .select(Constants.HIDDEN_FIELDS);
    } catch (err) {
      logger.error('Error occurred while retrieving Genre data.', err);
      throw new Error('Error occurred while retrieving Genre data.', err);
    }
  }

  async getGenreById(id) {
    try {
      return await Genre.findById(id).select(Constants.HIDDEN_FIELDS);
    } catch (err) {
      logger.error('Error occurred while retrieving Genre for Id: ' + id, err);
      throw new Error(
        'Error occurred while retrieving Genre for Id: ' + id,
        err
      );
    }
  }

  async updateGenre(id, payload) {
    try {
      return await Genre.findByIdAndUpdate(id, {
        $set: {
          name: payload.name
        },
        $currentDate: {
          updatedAt: 1
        }
      });
    } catch (err) {
      logger.error('Error occurred while updating Genre for Id: ' + id, err);
      throw new Error('Error occurred while updating Genre for Id: ' + id, err);
    }
  }

  async deleteGenre(id) {
    try {
      return await Genre.findByIdAndRemove(id);
    } catch (err) {
      logger.error('Error occurred while deleting Genre for Id: ' + id, err);
      throw new Error('Error occurred while deleting Genre for Id: ' + id, err);
    }
  }
};
