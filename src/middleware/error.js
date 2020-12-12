const { func } = require("joi");

const logger = require('winston');

// Error response middleware
module.exports = function (err, req, res, next) {
    switch (err.statusCode) {
        case 400:
            logger.error(err.msg);
            return res.status(400).send(err.msg);
        case 404:
            logger.error(err.msg);
            return res.status(404).send(err.msg);
        case 500:
            logger.error(`Error occurred in server.`, err.err.ex);
            return res.status(500).send(err.err.message);
        default:
            logger.error(`Error occurred in Error middleware.`);
            return res.send();
    }
};
