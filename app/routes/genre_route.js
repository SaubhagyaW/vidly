const express = require('express');

const { validate } = require('../model/genre');
const GenreService = require('../service/genre_service');

const genreService = new GenreService();

// Router to handle Genre requests
const genreRouter = express.Router();

genreRouter.post('/', async (req, res) => {
    let { error } = validate(req.body);
    if (error)
        return res.status(400).send('Invalid request payload.');

    try {
        let result = await genreService.createGenre(req.body);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

genreRouter.get('/', async (req, res) => {
    let pageNum = req.query.pageNum || 1;

    try {
        let result = await genreService.getGenres(pageNum);

        if (!result)
            return res.status(404).send('No Genres found.');

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

genreRouter.get('/:id', async (req, res) => {
    let genreId = req.params.id;

    try {
        let result = await genreService.getGenreById(genreId);

        if (!result)
            return res.status(404).send('No Genres found for Id: ' + genreId);

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

genreRouter.put('/:id', async (req, res) => {
    let genreId = req.params.id;

    let { error } = validate(req.body);
    if (error)
        return res.status(400).send('Invalid request payload.');

    try {
        let result = await genreService.updateGenre(genreId, req.body);

        if (!result)
            return res.status(404).send('No Genres found for Id: ' + genreId);

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

genreRouter.delete('/:id', async (req, res) => {
    let genreId = req.params.id;

    try {
        let result = await genreService.deleteGenre(genreId);

        if (!result)
            return res.status(404).send('No Genres found for Id: ' + genreId);

        res.send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = genreRouter;
