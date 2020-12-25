const config = require('config');
const express = require('express');
const cors = require('cors');

const Constants = require('./util/constants');

// Configurations
require('./init/logger')();
require('./init/db_config')();
require('./init/validation')();

// Express configs
const app = express();
app.use(express.json());

// Enable CORS
var corsOptions = {
  exposedHeaders: Constants.AUTH_HEADER
};
app.use(cors(corsOptions));

require('./init/routes')(app);

// Load modules necessary for Prod env.
if (config.get('env') === 'production') require('./init/prod')(app);

// Start server
const port = config.get('SERVER_PORT') || 3000;
const server = app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
