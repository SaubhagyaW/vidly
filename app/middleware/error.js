const { func } = require("joi");

const logger = require('winston');

// Error response middleware
module.exports = function (err, req, res, next) {
    switch (err.statusCode) {
        case 400:
            logger.error(`Invalid request payload - ${JSON.stringify(req.body)}`);
            return res.status(400).send('Invalid request payload.');
        case 404:
            logger.error(err.msg);
            return res.status(404).send(err.msg);
        case 500:
            logger.error(`Error occurred in server.`, err.ex);
            return res.status(500).send(err.msg);
        default:
            logger.error(`Error occurred in Error middleware.`);
            return res.send();
    }
};
