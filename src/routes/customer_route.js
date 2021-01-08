const logger = require('winston');
const express = require('express');

const authenticate = require('../middleware/authenticate');
const { validate } = require('../model/customer');
const CustomerService = require('../service/customer_service');

const customerService = new CustomerService();

// Router to handle Customer requests
const customerRouter = express.Router();

customerRouter.post('/', authenticate, async (req, res, next) => {
  logger.info(
    `Request received to create Customer - ${JSON.stringify(req.body)}`
  );

  let { error } = validate(req.body);
  if (error)
    return next({
      statusCode: 400,
      msg: `Invalid request payload - ${JSON.stringify(req.body)}`
    });

  try {
    let result = await customerService.createCustomer(req.body, req.user);
    logger.info(`Customer created - ${JSON.stringify(result)}`);

    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

customerRouter.get('/', authenticate, async (req, res, next) => {
  logger.info('Request received to get all Customers');

  let searchName = req.query.searchName || '';
  let sortField = req.query.sortField || 'fName';
  let sortOrder = req.query.sortOrder || 'asc';
  let pageNum = req.query.pageNum || 1;

  try {
    let result = await customerService.getCustomers(
      searchName,
      sortField,
      sortOrder,
      pageNum
    );

    logger.info(`Get all Customers - ${JSON.stringify(result)}`);
    res.send(result);
  } catch (err) {
    return next({ statusCode: 500, err: err });
  }
});

// customerRouter.get('/:id', async (req, res) => {
//     let customerId = req.params.id;

//     try {
//         let result = await customerService.getCustomerById(customerId);

//         if (!result)
//             return res.status(404).send('No Customer found for Id: ' + customerId);

//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// customerRouter.put('/:id', async (req, res) => {
//     let customerId = req.params.id;

//     let { error } = validate(req.body);
//     if (error)
//         return res.status(400).send('Invalid request payload.');

//     try {
//         let result = await customerService.updateCustomer(customerId, req.body);

//         if (!result)
//             return res.status(404).send('No Customer found for Id: ' + customerId);

//         res.send(result);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// customerRouter.delete('/:id', async (req, res) => {
//     let customerId = req.params.id;

//     try {
//         let result = await customerService.deleteCustomer(customerId);

//         if (!result)
//             return res.status(404).send('No Customer found for Id: ' + customerId);

//         res.send();
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

module.exports = customerRouter;
