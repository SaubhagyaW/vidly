const { Rental } = require('../model/rental');
const RentalRepository = require('../repository/rental_repository');
const CustomerRepository = require('../repository/customer_repository');
const MovieRepository = require('../repository/movie_repository');
const UserRepository = require('../repository/user_repository');

const _buildRental = Symbol();

// Service layer for Rental related operations
class RentalService {
  constructor() {
    this.rentalRepository = new RentalRepository();
    this.customerRepository = new CustomerRepository();
    this.movieRepository = new MovieRepository();
    this.userRepository = new UserRepository();
  }

  async createRental(payload, user) {
    try {
      let customer = await this.customerRepository.getCustomerById(
        payload.customerId
      );
      let movie = await this.movieRepository.getMovieById(payload.movieId);

      if (movie.numberInStock === 0) return new Error('No movies in stock');

      let rental = await this[_buildRental](customer, movie);
      return await this.rentalRepository.createRental(rental, user.email);
    } catch (err) {
      throw err;
    }
  }

  async getRentals(fromDate, toDate, customerId, pageNum) {
    try {
      return await this.rentalRepository.getRentals(
        fromDate,
        toDate,
        customerId,
        pageNum
      );
    } catch (err) {
      throw err;
    }
  }

  async [_buildRental](customer, movie, email) {
    let rental = new Rental({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    });

    try {
      let user = await this.userRepository.getUserIdByEmail(email);
      rental.createdBy = user._id;
      rental.updatedBy = user._id;
      return rental;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = RentalService;
