const jwt = require('jsonwebtoken');

const config = require('config');

module.exports = function generateAuthToken(user) {
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return jwt.sign(jwtPayload, config.get('PVT_KEY'));
};
