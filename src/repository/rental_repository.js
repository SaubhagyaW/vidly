const logger = require('winston');
// const Fawn = require('fawn');

const Constants = require('../util/constants');
const { Rental } = require('../model/rental');

// Repository to handle Rental data
class RentalRepository {
  async createRental(rental) {
    try {
      // FIXME
      // Transaction
      // return await new Fawn.Task()
      //     .save('rentals', rental)
      //     // .update('movies', { _id: rental.movie.id }, {
      //     //     $inc: {
      //     //         numberInStock: -1
      //     //     }
      //     // })
      //     .run();

      return rental;
    } catch (err) {
      logger.error('Error occurred while saving Rental data.', err);
      throw new Error('Error occurred while saving Rental data.', err);
    }
  }

  async getRentals(fromDate, toDate, customerId, pageNum) {
    // Set current date as default
    let from, to
    if (!fromDate || !toDate) {
      let currentDate = new Date();
      currentDate.setHours(0)
      currentDate.setMinutes(0)
      currentDate.setSeconds(0)
      currentDate.setMilliseconds(0)

      from = currentDate
      to = currentDate
    } else {
      from = new Date(fromDate);
      to = new Date(toDate);
    }

    if (!pageNum)
      pageNum = 1

    try {
      if (!customerId)
        return await Rental.find({ dateOut: { $gt: from, $lt: to } })
          .sort('-dateOut')
          .skip((pageNum - 1) * Constants.PAGE_SIZE)
          .limit(Constants.PAGE_SIZE)
          .select(Constants.HIDDEN_FIELDS);
      else
        return await Rental.find({ dateOut: { $gt: from, $lt: to }, customerId: customerId })
          .sort('-dateOut')
          .skip((pageNum - 1) * Constants.PAGE_SIZE)
          .limit(Constants.PAGE_SIZE)
          .select(Constants.HIDDEN_FIELDS);
    } catch (err) {
      logger.error('Error occurred while retrieving Rental data.', err);
      throw new Error('Error occurred while retrieving Rental data.', err);
    }
  }

  async getRentalById(id) {
    try {
      return await Rental.findById(id).select(Constants.HIDDEN_FIELDS);
    } catch (err) {
      logger.error('Error occurred while retrieving Rental for Id: ' + id, err);
      throw new Error(
        'Error occurred while retrieving Rental for Id: ' + id,
        err
      );
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
  //         });
  //     } catch (err) {
  //         console.error('Error occurred while updating Rental for Id: ' + id, err);
  //         throw new Error('Error occurred while updating Rental for Id: ' + id, err);
  //     }
  // }

  async deleteRental(id) {
    try {
      return await Rental.findByIdAndRemove(id);
    } catch (err) {
      logger.error('Error occurred while deleting Rental for Id: ' + id, err);
      throw new Error(
        'Error occurred while deleting Rental for Id: ' + id,
        err
      );
    }
  }
}

module.exports = RentalRepository;
