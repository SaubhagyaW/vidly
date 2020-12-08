const config = require('config');
const express = require('express');

// Configurations
require('./init/logger')();
require('./init/db_config')();
require('./init/validation')();

// throw new Error('Bla bla');

// Express configs
const app = express();
app.use(express.json());
require('./init/routes')(app);

// Load modules necessary for Prod env.
if (config.get('env') === 'production')
    require('./init/prod')(app);

// Start server
const port = config.get('SERVER_PORT') || 3000;
app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
});
