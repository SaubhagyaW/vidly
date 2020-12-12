const _ = require('lodash');
const logger = require('winston');
const express = require('express');

const { validate } = require('../model/user');
const UserService = require('../service/user_service');

const userService = new UserService();

// Router to handle User requests
const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    logger.info(`Request received to create user - ${JSON.stringify(req.body)}`);

    let { error } = validate(req.body);
    if (error) {
        logger.error(`Invalid request payload - ${JSON.stringify(req.body)}`);
        return next({ statusCode: 400, err: { msg: `Invalid request payload - ${JSON.stringify(req.body)}` } });
    }

    try {
        let result = await userService.createUser(req.body);
        logger.info(`User created - ${JSON.stringify(result)}`);

        res.send(_.pick(result, ['_id', 'name', 'email']));
    } catch (err) {
        return next({ statusCode: 500, err: err });
    }
});

module.exports = userRouter;
