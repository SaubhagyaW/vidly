const jwt = require('jsonwebtoken');

const Constants = require('../util/constants');
const config = require('config');

// Authentication middleware
module.exports = function (req, res, next) {
  const token = req.header(Constants.AUTH_HEADER);

  if (!token) return res.status(401).send('Access Denied!');

  try {
    let decoded = jwt.verify(token, config.get('PVT_KEY'));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Access Denied!');
  }
};
