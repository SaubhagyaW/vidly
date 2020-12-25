const logger = require('winston');
const { User } = require('../model/user');

// Repository to handle User data
class UserRepository {
  async createUser(user) {
    try {
      return await user.save();
    } catch (err) {
      logger.error('Error occurred while saving User data.', err);
      throw new Error('Error occurred while saving User data.', err);
    }
  }

  async getUserByEmail(email) {
    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        logger.error(`No user found for email: ${email}`);
        throw new Error(`No user found for email: ${email}`);
      }

      return user;
    } catch (err) {
      logger.error(
        `Error occurred while retrieving User data for email: ${email}`,
        err
      );
      throw new Error(
        `Error occurred while retrieving User data for email: ${email}`,
        err
      );
    }
  }

  async getUserIdByEmail(email) {
    try {
      let user = await User.findOne({ email: email }).select('_id');

      if (!user) {
        logger.error(`No user found for email: ${email}`);
        throw new Error(`No user found for email: ${email}`);
      }

      return user;
    } catch (err) {
      logger.error(
        `Error occurred while retrieving User data for email: ${email}`,
        err
      );
      throw new Error(
        `Error occurred while retrieving User data for email: ${email}`,
        err
      );
    }
  }
}

module.exports = UserRepository;
