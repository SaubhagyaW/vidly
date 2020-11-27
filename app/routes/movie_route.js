const express = require('express');

const { validate } = require('../model/movie');
const MovieService = require('../service/movie_service');

const movieService = new MovieService();

// Router to handle Movie requests
const movieRouter = express.Router();

movieRouter.post('/', async (req, res) => {
    let { error } = validate(req.body);
    if (error)
        return res.status(400).send('Invalid request payload.');

    try {
        let result = await movieService.createMovie(req.body);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

movieRouter.get('/', async (req, res) => {
    let pageNum = req.query.pageNum || 1;

    try {
        let result = await movieService.getMovies(pageNum);

        if (!result)
            return res.status(404).send('No Movie found.');

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

movieRouter.get('/:id', async (req, res) => {
    let movieId = req.params.id;

    try {
        let result = await movieService.getMovieById(movieId);

        if (!result)
            return res.status(404).send('No Movie found for Id: ' + movieId);

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

movieRouter.put('/:id', async (req, res) => {
    let movieId = req.params.id;

    let { error } = validate(req.body);
    if (error)
        return res.status(400).send('Invalid request payload.');

    try {
        let result = await movieService.updateMovie(movieId, req.body);

        if (!result)
            return res.status(404).send('No Movie found for Id: ' + movieId);

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

movieRouter.delete('/:id', async (req, res) => {
    let movieId = req.params.id;

    try {
        let result = await movieService.deleteMovie(movieId);

        if (!result)
            return res.status(404).send('No Movie found for Id: ' + movieId);

        res.send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = movieRouter;
