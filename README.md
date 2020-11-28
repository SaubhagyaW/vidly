# vidly
Full fledged Node JS project for a Movie rental shop.

## Functionality
1. CRUD operations to handle movie genres.
2. CRUD operations to handle movies.
3. CRUD operations to handle customers.
4. Create/Read operations to handle rentals.
    - Before renting out a movie, should check for availability in stock.
    - When a movie is rented out, movies in stock should also be updated accordingly.

## Implementation Details
1. DB -> Mongoose
    - DB validations.
    - Model relationships between connected data (Movie, Rental).
    - Two phase commits (Transactions) implemented in create rentals (Using Fawn module).
2. REST framework -> Express
    - API level validations (Using Joi module).
    - Error handling middleware implemented.
3. Logging and error handling implemented for Genres.
    - Winston module is used.
    - Log output is written to console as well as files.
4. Authentication and authorization layer implemented for Genres.
5. Cross cutting feature implemented (Trace Id).
6. Env variables configured (Using config module).
7. TDD (Unit/Integration testing)
8. Deployment

## FIX-ME
1. Upgrade to latest ES version (ES10).
2. Resolve npm vulnerability warnings.
3. Define the global constants correctly.
4. Make Genre "name" immutable.
5. Make Two phase commit work.
6. Add proper log format, colorize and file rotation configs.

## TODO
2. Implement authentication and authorization layer.
3. Unit testing/Integration testing/TDD
4. Deployment
5. Implement trace Id. (Check modules -> helmet, morgan)
6. Configure env variables correctly.

## API Specification

[View](./API_spec.md)