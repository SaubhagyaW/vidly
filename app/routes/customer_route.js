const express = require('express');

const { validate } = require('../model/customer');
const CustomerService = require('../service/customer_service');

const customerService = new CustomerService();

// Router to handle Customer requests
const customerRouter = express.Router();

customerRouter.post('/', async (req, res) => {
    let { error } = validate(req.body);
    if (error)
        return res.status(400).send('Invalid request payload.');

    try {
        let result = await customerService.createCustomer(req.body);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

customerRouter.get('/', async (req, res) => {
    let pageNum = req.query.pageNum || 1;

    try {
        let result = await customerService.getCustomers(pageNum);

        if (!result)
            return res.status(404).send('No Customers found.');

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

customerRouter.get('/:id', async (req, res) => {
    let customerId = req.params.id;

    try {
        let result = await customerService.getCustomerById(customerId);

        if (!result)
            return res.status(404).send('No Customer found for Id: ' + customerId);

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

customerRouter.put('/:id', async (req, res) => {
    let customerId = req.params.id;

    let { error } = validate(req.body);
    if (error)
        return res.status(400).send('Invalid request payload.');

    try {
        let result = await customerService.updateCustomer(customerId, req.body);

        if (!result)
            return res.status(404).send('No Customer found for Id: ' + customerId);

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

customerRouter.delete('/:id', async (req, res) => {
    let customerId = req.params.id;

    try {
        let result = await customerService.deleteCustomer(customerId);

        if (!result)
            return res.status(404).send('No Customer found for Id: ' + customerId);

        res.send();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = customerRouter;
