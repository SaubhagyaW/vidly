const logger = require('winston');
const _ = require('lodash');
const express = require('express');
const mongoose = require('mongoose');

const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const { validate } = require('../model/movie');
const MovieService = require('../service/movie_service');

const movieService = new MovieService();

// Router to handle Movie requests
const movieRouter = express.Router();

movieRouter.post('/', authenticate, async (req, res, next) => {
  logger.info(`Request received to create Movie - ${JSON.stringify(req.body)}`);

  let { error } = validate(req.body);
  if (error)
    return next({
      statusCode: 400,
      msg: `Invalid request payload - ${JSON.stringify(req.body)}`
    });

  try {
    let result = await movieService.createMovie(req.body, req.user);
    logger.info(`Movie created - ${JSON.stringify(result)}`);

    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

movieRouter.get('/', authenticate, async (req, res, next) => {
  logger.info('Request received to get all Movies');

  const searchTitle = req.query.searchTitle;
  const sortField = req.query.sortField;
  const sortOrder = req.query.sortOrder;
  const pageNum = req.query.pageNum;

  try {
    let result = await movieService.getMovies(
      searchTitle,
      sortField,
      sortOrder,
      pageNum
    );

    logger.info(`Get all Movies - ${JSON.stringify(result)}`);
    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

movieRouter.get('/:id', authenticate, async (req, res, next) => {
  let movieId = req.params.id;
  logger.info(`Request received to get Movie for Id: ${movieId}`);

  if (!mongoose.Types.ObjectId.isValid(movieId))
    return next({
      statusCode: 400,
      msg: `Invalid path parameter - ${movieId}`
    });

  try {
    let result = await movieService.getMovieById(movieId);

    if (!result)
      return next({
        statusCode: 404,
        msg: `No Movies found for Id: ${movieId}`
      });

    logger.info(`Get Movie - ${JSON.stringify(result)}`);
    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

movieRouter.put('/:id', authenticate, async (req, res, next) => {
  let movieId = req.params.id;
  logger.info(
    `Request received to update Movie for Id: ${movieId} - ${JSON.stringify(
      req.body
    )}`
  );

  if (!mongoose.Types.ObjectId.isValid(movieId))
    return next({
      statusCode: 400,
      msg: `Invalid path parameter - ${movieId}`
    });

  let { error } = validate(req.body);
  if (error)
    return next({
      statusCode: 400,
      msg: `Invalid request payload - ${JSON.stringify(req.body)}`
    });

  try {
    let result = await movieService.updateMovie(movieId, req.body, req.user);

    if (!result)
      return next({
        statusCode: 404,
        msg: `No Movie found for Id: ${movieId}`
      });

    logger.info(`Movie updated - ${JSON.stringify(result)}`);
    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

// User must have admin permissions to delete a Movie.
movieRouter.delete('/:id', [authenticate, authorize], async (req, res, next) => {
  let movieId = req.params.id;
  logger.info(`Request received to delete Movie for Id: ${movieId}`);

  if (!mongoose.Types.ObjectId.isValid(movieId))
    return next({
      statusCode: 400,
      msg: `Invalid path parameter - ${movieId}`
    });

  try {
    let result = await movieService.deleteMovie(movieId);

    if (!result)
      return next({
        statusCode: 404,
        msg: `No Movie found for Id: ${movieId}`
      });

    logger.info(`Genre deleted for Id: ${result._id}`);
    res.send(_.pick(result, ['_id']));
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

module.exports = movieRouter;
