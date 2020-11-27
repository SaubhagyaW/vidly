const { Rental } = require('../model/rental');
const RentalRepository = require('../repository/rental_repository');
const CustomerRepository = require('../repository/customer_repository');
const MovieRepository = require('../repository/movie_repository');

const rentalRepository = new RentalRepository();
const customerRepository = new CustomerRepository();
const movieRepository = new MovieRepository();

const _buildRental = Symbol();

class RentalService {
    async createRental(payload) {
        try {
            let customer = await customerRepository.getCustomerById(payload.customerId);
            let movie = await movieRepository.getMovieById(payload.movieId);

            if (movie.numberInStock === 0)
                return new Error('No movies in stock');

            let rental = this[_buildRental](customer, movie);
            return await rentalRepository.createRental(rental);
        } catch (err) {
            throw err;
        }
    }

    async getRentals(pageNum) {
        try {
            return await rentalRepository.getRentals(pageNum);
        } catch (err) {
            throw err;
        }
    }

    [_buildRental](customer, movie) {
        return new Rental({
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
    }
}

module.exports = RentalService;
