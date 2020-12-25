const genreRouter = require('../routes/genre_route');
const movieRouter = require('../routes/movie_route');
const customerRouter = require('../routes/customer_route');
const rentalRouter = require('../routes/rental_route');
const userRouter = require('../routes/user_route');
const authRouter = require('../routes/auth_route');

const error = require('../middleware/error');

module.exports = function (app) {
    // Home page
    app.get('/', (req, res) => {
        res.send('Vidly Home Page');
    });

    // Route mappings
    app.use('/api/genres', genreRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/rentals', rentalRouter);
    app.use('/api/users', userRouter);
    app.use('/auth', authRouter);

    // Error handling middleware
    // NOTE: Use of middleware handlers slow down the request processing performance.
    //       Therefore don't use them unnecessaruly.
    app.use(error);
};