const _ = require('lodash');
const logger = require('winston');
const bcrypt = require('bcrypt');

const { User } = require('../model/user');
const UserRepository = require('../repository/user_repository');

const userRepository = new UserRepository();

const _buildUser = Symbol();

// Service layer for User related operations
class UserService {
    async createUser(payload) {
        try {
            let existingUser = await User.findOne({ email: payload.email });
            if (existingUser) {
                logger.error(`User already exists for email: ${payload.email}`);
                throw new Error(`User already exists for email: ${payload.email}`);
            }

            let user = await this[_buildUser](payload);
            return await userRepository.createUser(user);
        } catch (err) {
            throw err;
        }
    }

    async [_buildUser](payload) {
        let user = new User({
            name: payload.name,
            email: payload.email,
            isAdmin: payload.admin
        });

        try {
            // Hash the password
            let salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(payload.password, salt);

            return user;
        } catch (err) {
            throw err;
        }

    }
}

module.exports = UserService;
