const _ = require('lodash');
const logger = require('winston');
const express = require('express');

const Constants = require('../util/constants');

const { validate } = require('../model/user');
const UserService = require('../service/user_service');
const AuthService = require('../service/auth_service');

const userService = new UserService();
const authService = new AuthService();

// Router to handle User requests
const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  const { body: payload } = req;
  logger.info(`Request received to create user - ${JSON.stringify(payload)}`);

  let { error } = validate(payload);
  if (error)
    return next({
      statusCode: 400,
      err: { msg: `Invalid request payload - ${JSON.stringify(payload)}` }
    });

  try {
    let user = await userService.createUser(payload);
    logger.info(`User created - ${JSON.stringify(user)}`);

    const jwtToken = await authService.validatePassword(payload.password, user);

    res
      .header(Constants.AUTH_HEADER, jwtToken)
      .send(_.pick(user, ['_id', 'name', 'email']));
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

module.exports = userRouter;
