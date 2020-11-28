const logger = require('winston');
const express = require('express');

const { validate } = require('../model/genre');
const GenreService = require('../service/genre_service');

const genreService = new GenreService();

// Router to handle Genre requests
const genreRouter = express.Router();

genreRouter.post('/', async (req, res, next) => {
    logger.info(`Request received to create genre - ${JSON.stringify(req.body)}`);

    let { error } = validate(req.body);
    if (error)
        return next({ statusCode: 400 });

    try {
        let result = await genreService.createGenre(req.body);
        logger.info(`Genre created - ${JSON.stringify(result)}`);
        
        res.send(result);
    } catch (err) {
        return next({ statusCode: 500, ex: err });
    }
});

genreRouter.get('/', async (req, res) => {
    logger.info('Request received to get all genres');
    let pageNum = req.query.pageNum || 1;

    try {
        let result = await genreService.getGenres(pageNum);

        if (!result)
            return next({ statusCode: 404, msg: 'No Genres found.' });

        logger.info(`Get all Genres - ${JSON.stringify(result)}`);
        res.send(result);
    } catch (err) {
        return next({ statusCode: 500, ex: err });
    }
});

genreRouter.get('/:id', async (req, res) => {
    let genreId = req.params.id;
    logger.info(`Request received to get genre for Id: ${genreId}`);

    try {
        let result = await genreService.getGenreById(genreId);

        if (!result)
            return next({ statusCode: 404, msg: `No Genres found for Id: ${genreId}` });

        logger.info(`Get Genre - ${JSON.stringify(result)}`);
        res.send(result);
    } catch (err) {
        return next({ statusCode: 500, ex: err });
    }
});

genreRouter.put('/:id', async (req, res, next) => {
    let genreId = req.params.id;
    logger.info(`Request received to update genre for Id: ${genreId} - ${JSON.stringify(req.body)}`);

    let { error } = validate(req.body);
    if (error)
        return next({ statusCode: 404, msg: `No Genres found for Id: ${genreId}` });

    try {
        let result = await genreService.updateGenre(genreId, req.body);

        if (!result)
            return next({ statusCode: 404, msg: `No Genres found for Id: ${genreId}` });

        logger.info(`Genre updated - ${JSON.stringify(result)}`);
        res.send(result);
    } catch (err) {
        return next({ statusCode: 500, ex: err });
    }
});

genreRouter.delete('/:id', async (req, res) => {
    let genreId = req.params.id;
    logger.info(`Request received to delete genre for Id: ${genreId}`);

    try {
        let result = await genreService.deleteGenre(genreId);

        if (!result)
            return next({ statusCode: 404, msg: `No Genres found for Id: ${genreId}` });

        logger.info(`Genre deleted for Id: ${genreId}`);
        res.send();
    } catch (err) {
        return next({ statusCode: 500, ex: err });
    }
});

module.exports = genreRouter;
