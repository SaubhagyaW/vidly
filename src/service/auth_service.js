const _ = require('lodash');
const logger = require('winston');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user_repository');
const generateAuthToken = require('../util/jwt_util');

const userRepository = new UserRepository();

// Service layer for Authentication related operations
class AuthService {
  async authenticateUser(payload) {
    try {
      let user = await userRepository.getUserByEmail(payload.email);
      if (!user) return res.status(400).send('Invalid email or password!');

      const jwtToken = await this.validatePassword(payload.password, user);
      logger.info(`Successfull login for user: ${user._id}`);

      return jwtToken;
    } catch (err) {
      throw err;
    }
  }

  async validatePassword(pwd, user) {
    const validPwd = await bcrypt.compare(pwd, user.password);
    if (!validPwd) return res.status(400).send('Invalid email or password!');

    return generateAuthToken(user);
  }
}

module.exports = AuthService;
