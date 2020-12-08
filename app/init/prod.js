const helmet = require('helmet');
const compression = require('compression');

// Modules necessary for Production
module.exports = function (app) {
    app.use(helmet());  // Provides security against known common vulnerabilities.
    app.use(compression()); // Compresses the HTTP responses.
};
