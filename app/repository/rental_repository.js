const Fawn = require('fawn');

const Constants = require('../util/constants');
const { Rental } = require('../model/rental');

// Repository to handle Rental data
class RentalRepository {
    async createRental(rental) {
        try {
            // FIX-ME
            // Transaction
            return await new Fawn.Task()
                .save('rentals', rental)
                // .update('movies', { _id: rental.movie.id }, {
                //     $inc: {
                //         numberInStock: -1
                //     }
                // })
                .run();

            // return rental;
        } catch (err) {
            console.error('Error occurred while saving Rental data.', err);
            throw new Error('Error occurred while saving Rental data.', err);
        }
    }

    async getRentals(pageNum) {
        try {
            return await Rental
                .find()
                .skip((pageNum - 1) * Constants.pageSize)
                .limit(Constants.pageSize)
                .sort('-dateOut')
                .select(Constants.hiddenFields);
        } catch (err) {
            console.error('Error occurred while retrieving Rental data.', err);
            throw new Error('Error occurred while retrieving Rental data.', err);
        }
    }

    async getRentalById(id) {
        try {
            return await Rental
                .findById(id)
                .select(Constants.hiddenFields);
        } catch (err) {
            console.error('Error occurred while retrieving Rental for Id: ' + id, err);
            throw new Error('Error occurred while retrieving Rental for Id: ' + id, err);
        }
    }

    // async updateRental(id, payload) {
    //     try {
    //         let customer = await customerRepository.getCustomerById(payload.customerId);
    //         let movie = await movieRepository.getMovieById(payload.movieId);

    //         return await Rental.findByIdAndUpdate(id, {
    //             $set: {
    //                 customer: {
    //                     _id: customer._id,
    //                     name: customer.name,
    //                     phone: customer.phone,
    //                     isGold: customer.isGold
    //                 },
    //                 movie: {
    //                     _id: movie._id,
    //                     title: movie.title,
    //                     dailyRentalRate: movie.dailyRentalRate
    //                 },
    //                 dateReturned: payload.dateReturned,
    //                 rentalFee: payload.rentalFee
    //             },
    //             $currentDate: {
    //                 updatedAt: 1
    //             }
    //         }, { new: true, useFindAndModify: false, runValidators: true });
    //     } catch (err) {
    //         console.error('Error occurred while updating Rental for Id: ' + id, err);
    //         throw new Error('Error occurred while updating Rental for Id: ' + id, err);
    //     }
    // }

    async deleteRental(id) {
        try {
            return await Rental.findByIdAndRemove(id, { useFindAndModify: false });
        } catch (err) {
            console.error('Error occurred while deleting Rental for Id: ' + id, err);
            throw new Error('Error occurred while deleting Rental for Id: ' + id, err);
        }
    }
}

module.exports = RentalRepository;
