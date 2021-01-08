const logger = require('winston');
const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');

const Constants = require('../util/constants');

const authenticate = require('../middleware/authenticate');
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

userRouter.get('/:id', authenticate, async (req, res, next) => {
  let userId = req.params.id;
  logger.info(`Request received to get User for Id: ${userId}`);

  // Logged in user verification
  if (req.user._id !== userId)
    return res.status(403).send('Permission Denied!');

  if (!mongoose.Types.ObjectId.isValid(userId))
    return next({ statusCode: 400, msg: `Invalid path parameter - ${userId}` });

  try {
    let result = await userService.getUserById(userId);

    if (!result)
      return next({ statusCode: 404, msg: `No Users found for Id: ${userId}` });

    logger.info(`Get User - ${JSON.stringify(result)}`);
    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

module.exports = userRouter;
