const winston = require('winston');

// Initialize Logger
module.exports = function () {
    // Log all unhandled exceptions
    winston
        .exceptions.handle([
            new winston.transports.Console(),
            new winston.transports.File({ filename: './logs/error.log' })]);

    // Throw error on unhandledPromiseRejections
    process.on('unhandledRejection', (err) => {
        throw err;
    });

    // Configure transports for logging
    winston
        .add(new winston.transports.Console())
        .add(new winston.transports.File({ filename: './logs/server-vidly.log', level: 'info' }))
        .add(new winston.transports.File({ filename: './logs/error.log', level: 'error' }));
};
