const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('config');
const { User } = require('../model/user');

// Router to handle User Login
const authRouter = express.Router();

authRouter.post('/', async (req, res, next) => {
    logger.info(`Login request received for email: ${JSON.stringify(req.body.email)}`);

    let validPayload = validate(req.body);
    if (!validPayload)
        return res.status(400).send('Invalid email or password!');

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send('Invalid email or password!');

        let validPwd = await bcrypt.compare(req.body.password, user.password);
        if (!validPwd)
            return res.status(400).send('Invalid email or password!');

        const jwtPayload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        };
        const token = jwt.sign(jwtPayload, config.get('PVT_KEY'));
        return res
            .header('x-jwt-assertion', token)
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
