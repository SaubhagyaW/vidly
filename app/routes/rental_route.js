const express = require('express');

const { validate } = require('../model/rental');
const RentalService = require('../service/rental_service');

const rentalService = new RentalService();

// Router to handle Rental requests
const rentalRouter = express.Router();

rentalRouter.post('/', async (req, res) => {
    let { error } = validate(req.body);
    if (error)
        return res.status(400).send('Invalid request payload.');

    try {
        let result = await rentalService.createRental(req.body);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

rentalRouter.get('/', async (req, res) => {
    let pageNum = req.query.pageNum || 1;

    try {
        let result = await rentalService.getRentals(pageNum);

        if (!result)
            return res.status(404).send('No Rental found.');

        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
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
