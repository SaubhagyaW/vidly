const config = require('config');
const mongoose = require('mongoose');
const Fawn = require('fawn');

const mongoDbUrl = `${config.get('database.MONGO_URL')}/${config.get('database.DB_NAME')}`
    || 'mongodb://localhost/vidly';

// Initialize DB connection
module.exports = function () {
    mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to Mongo DB...');

            // Initialize "Fawn" package to handle Transactions (i.e. Two phase commits in Mongo DB)
            Fawn.init(mongoose);
        });
}
