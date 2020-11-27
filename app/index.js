const config = require('config');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const dbConfig = require('./config/db_config');

// Routes
const genreRouter = require('./routes/genre_route');
const movieRouter = require('./routes/movie_route');
const customerRouter = require('./routes/customer_route');
const rentalRouter = require('./routes/rental_route');

// DB initialization
dbConfig.initDB();

// Express configs
const app = express();
app.use(express.json());

// Route mappings
app.use('/api/genres', genreRouter);
app.use('/api/movies', movieRouter);
app.use('/api/customers', customerRouter);
app.use('/api/rentals', rentalRouter);

// Home page
app.get('/', (req, res) => {
    res.send('Vidly Home Page');
});

// Start server
const port = config.get('SERVER_PORT') || 3000;
app.listen(port, function () {
    console.log(`Listening on port ${port}...`);
});
