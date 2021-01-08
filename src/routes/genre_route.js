const logger = require('winston');
const express = require('express');
// const mongoose = require('mongoose');

const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');
const { validate } = require('../model/genre');
const GenreService = require('../service/genre_service');

const genreService = new GenreService();

// Router to handle Genre requests
const genreRouter = express.Router();

genreRouter.post('/', authenticate, async (req, res, next) => {
  logger.info(`Request received to create Genre - ${JSON.stringify(req.body)}`);

  let { error } = validate(req.body);
  if (error)
    return next({
      statusCode: 400,
      msg: `Invalid request payload - ${JSON.stringify(req.body)}`
    });

  try {
    let result = await genreService.createGenre(req.body, req.user);
    logger.info(`Genre created - ${JSON.stringify(result)}`);

    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

genreRouter.get('/', authenticate, async (req, res, next) => {
  logger.info('Request received to get all Genres');

  try {
    let result = await genreService.getGenres();

    logger.info(`Get all Genres - ${JSON.stringify(result)}`);
    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

// genreRouter.get('/:id', authenticate, async (req, res, next) => {
//     let genreId = req.params.id;
//     logger.info(`Request received to get Genre for Id: ${genreId}`);

//     if (!mongoose.Types.ObjectId.isValid(genreId))
//         return next({ statusCode: 400, msg: `Invalid path parameter - ${genreId}` });

//     try {
//         let result = await genreService.getGenreById(genreId);

//         if (!result)
//             return next({ statusCode: 404, msg: `No Genres found for Id: ${genreId}` });

//         logger.info(`Get Genre - ${JSON.stringify(result)}`);
//         res.send(result);
//     } catch (err) {
//         return next({ statusCode: 500, err: err });
//     }
// });

// genreRouter.put('/:id', authenticate, async (req, res, next) => {
//     let genreId = req.params.id;
//     logger.info(`Request received to update Genre for Id: ${genreId} - ${JSON.stringify(req.body)}`);

//     if (!mongoose.Types.ObjectId.isValid(genreId))
//         return next({ statusCode: 400, msg: `Invalid path parameter - ${genreId}` });

//     let { error } = validate(req.body);
//     if (error)
//         return next({ statusCode: 400, msg: `Invalid request payload - ${JSON.stringify(req.body)}` });

//     try {
//         let result = await genreService.updateGenre(genreId, req.body, req.user);

//         if (!result)
//             return next({ statusCode: 404, msg: `No Genres found for Id: ${genreId}` });

//         logger.info(`Genre updated - ${JSON.stringify(result)}`);
//         res.send(result);
//     } catch (err) {
//         return next({ statusCode: 500, err: err });
//     }
// });

// // User must have admin permissions to delete a genre.
// genreRouter.delete('/:id', [authenticate, authorize], async (req, res, next) => {
//     let genreId = req.params.id;
//     logger.info(`Request received to delete Genre for Id: ${genreId}`);

//     if (!mongoose.Types.ObjectId.isValid(id))
//         return next({ statusCode: 400, msg: `Invalid path parameter - ${genreId}` });

//     try {
//         let result = await genreService.deleteGenre(genreId);

//         if (!result)
//             return next({ statusCode: 404, msg: `No Genres found for Id: ${genreId}` });

//         logger.info(`Genre deleted for Id: ${genreId}`);
//         res.send();
//     } catch (err) {
//         return next({ statusCode: 500, err: err });
//     }
// });

module.exports = genreRouter;
