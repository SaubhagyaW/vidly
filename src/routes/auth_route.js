const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const generateAuthToken = require('../util/jwt_util');
const UserRepository = require('../repository/user_repository');

// Router to handle User Login
const authRouter = express.Router();

let userRepository = new UserRepository();

authRouter.post('/', async (req, res, next) => {
    logger.info(`Login request received for email: ${JSON.stringify(req.body.email)}`);

    let validPayload = validate(req.body);
    if (!validPayload)
        return res.status(400).send('Invalid email or password!');

    try {
        let user = await userRepository.getUserIdByEmail(req.body.email);
        if (!user)
            return res.status(400).send('Invalid email or password!');

        let validPwd = await bcrypt.compare(req.body.password, user.password);
        if (!validPwd)
            return res.status(400).send('Invalid email or password!');

        const jwtToken = generateAuthToken(user);
        return res
            .header('x-jwt-assertion', jwtToken)
            .status(200)
            .send('Successfully login.');
    } catch (err) {
        return next({ statusCode: 500, ex: err });
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
