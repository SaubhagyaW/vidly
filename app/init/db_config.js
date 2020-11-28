const config = require('config');
const mongoose = require('mongoose');
const Fawn = require('fawn');

const mongoDbUrl = `${config.get('database.MONGO_URL')}/${config.get('database.DB_NAME')}`
    || 'mongodb://localhost/vidly';

// Initialize DB
module.exports = function () {
    // DB connection
    mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to Mongo DB...'));

    // DB configs
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('runValidators', true);
    mongoose.set('returnOriginal', false);

    // Initialize "Fawn" package to handle Transactions (i.e. Two phase commits in Mongo DB)
    Fawn.init(mongoose);
}
