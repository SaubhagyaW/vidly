const logger = require('winston');
const express = require('express');
const Joi = require('joi');

const Constants = require('../util/constants');

const AuthService = require('../service/auth_service');

const authService = new AuthService();

// Router to handle User Login
const authRouter = express.Router();

authRouter.post('/', async (req, res, next) => {
  logger.info(
    `Login request received for email: ${JSON.stringify(req.body.email)}`
  );

  let validPayload = validate(req.body);
  if (!validPayload) return res.status(400).send('Invalid email or password!');

  try {
    const jwtToken = await authService.authenticateUser(req.body);

    return res
      .header(Constants.AUTH_HEADER, jwtToken)
      .status(200)
      .send('Successfull login.');
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

function validate(payload) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(50),
    password: Joi.string().required()
  });

  return schema.validate(payload);
}

module.exports = authRouter;
