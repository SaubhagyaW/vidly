const logger = require('winston');
const express = require('express');

const authenticate = require('../middleware/authenticate');
const { validate } = require('../model/rental');
const RentalService = require('../service/rental_service');

const rentalService = new RentalService();

// Router to handle Rental requests
const rentalRouter = express.Router();

rentalRouter.post('/', authenticate, async (req, res, next) => {
  ogger.info(`Request received to create Rental - ${JSON.stringify(req.body)}`);

  let { error } = validate(req.body);
  if (error)
    return next({
      statusCode: 400,
      msg: `Invalid request payload - ${JSON.stringify(req.body)}`
    });

  try {
    let result = await rentalService.createRental(req.body, req.user);
    logger.info(`Rental created - ${JSON.stringify(result)}`);

    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

rentalRouter.get('/', authenticate, async (req, res, next) => {
  logger.info('Request received to get all Rentals');

  const fromDate = req.query.fromDate;
  const toDate = req.query.toDate;
  const customerId = req.query.customerId;
  const pageNum = req.query.pageNum;

  try {
    let result = await rentalService.getRentals(
      fromDate,
      toDate,
      customerId,
      pageNum
    );

    logger.info(`Get all Rentals - ${JSON.stringify(result)}`);
    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

// rentalRouter.get('/:id', async (req, res) => {
//     let rentalId = req.params.id;

//     try {
//         let result = await rentalService.getRentalById(rentalId);

//         if (!result)
//             return res.status(404).send('No Rental found for Id: ' + rentalId);

//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// rentalRouter.put('/:id', async (req, res) => {
//     let rentalId = req.params.id;

//     let { error } = validate(req.body);
//     if (error)
//         return res.status(400).send('Invalid request payload.');

//     try {
//         let result = await rentalRepository.updateRental(rentalId, req.body);

//         if (!result)
//             return res.status(404).send('No Rental found for Id: ' + rentalId);

//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// rentalRouter.delete('/:id', async (req, res) => {
//     let rentalId = req.params.id;

//     try {
//         let result = await rentalService.deleteRental(rentalId);

//         if (!result)
//             return res.status(404).send('No Rental found for Id: ' + rentalId);

//         res.send();
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

module.exports = rentalRouter;
