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
3. Lodash module is used - A library build on top of "underscore" module, which provides utility functions for common programming tasks
4. Logging and error handling implemented for Genres.
    - Winston module is used.
    - Log levels/format/colors configured.
    - Log output is written to console and files (File rotation configured).
5. Authentication and authorization layer implemented for Genres.
    - A user must have admin permissions to delete a genre.
    - JWT is used.
    - Password validation based on a criteria (Using Joi-password-complexity module).
    - Password hashing when saving to the DB (Using bcrypt module).
6. Cross cutting feature implemented (Trace Id).
7. Env variables configured (Using config module).
8. TDD (Unit/Integration testing)
9. Deployment
    - Helmet and compression modules are used to handle security and improve performance in Production.

## TODO
1. Upgrade to latest ES version (ES10).
2. Review Controller-Service-Repository pattern.
3. Resolve npm vulnerability warnings.
4. Define the global constants correctly. 
5. Make Genre "name" immutable.
6. Make Two phase commit work.
7. Add proper log format, colors and file rotation configs.
8. Configure env variables correctly.
9. Dockerize
10. Implement trace Id. (Check modules -> helmet, morgan)
11. /returns API

GitHub link: https://github.com/mosh-hamedani/vidly-api-node/tree/master/routes

## API Specification

[View](./API_spec.md)
