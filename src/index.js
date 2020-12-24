const config = require('config');
const express = require('express');
const cors = require('cors');

// Configurations
require('./init/logger')();
require('./init/db_config')();
require('./init/validation')();

// throw new Error('Bla bla');

// Express configs
const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

require('./init/routes')(app);

// Load modules necessary for Prod env.
if (config.get('env') === 'production') require('./init/prod')(app);

// Start server
const port = config.get('SERVER_PORT') || 3000;
const server = app.listen(port, function () {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
