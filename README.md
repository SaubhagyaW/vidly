# vidly
Full fledged Node JS project for a Movie rental shop.

## Functionality
1. CRUD operations to handle movie genres.
2. CRUD operations to handle movies.
3. CRUD operations to handle customers.
4. Create/Read operations to handle rentals.

## Implementation Details
1. DB -> Mongoose
    - DB validations.
    - Model relationships between connected data (Movie, Rental).
    - Two phase commits (Transactions) implemented in create rentals (Using Fawn module).
2. REST framework -> Express
    - API level validations (Using Joi module).
3. Logging and error handling implemented for Genres.
4. Authentication and authorization layer implemented for Genres.
5. Cross cutting feature implemented (Trace Id).
6. Env variables configured (Using config module).
7. TDD (Unit/Integration testing)
8. Deployment

## TODO
1. Upgrade to latest ES version (ES10).
2. Resolve npm vulnerability warnings
3. Define the global constants correctly.
4. Make Genre "name" immutable.
5. Make Two phase commit work.

## Future Enhancements
1. Logging and error handling. (Use template strings)
2. Implement authentication and authorization layer.
3. Unit testing/Integration testing/TDD
4. Deployment
5. Implement trace Id. (Check modules -> helmet, morgan)
6. Configure env variables correctly.

## API Specification

### 1. Movie Genres

**POST /api/genres**

Request:
```
{
    "name": "#string"   (required)
}
```

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "name": "#string"
}
```

**GET /api/genres**

Response:

Status code: 200
```
[
    {
        "_id": "#objectId",
        "name": "#string"
    }
]
```

**GET /api/genres/{id}**

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "name": "#string"
}
```

**PUT /api/genres/{id}**

Request:
```
{
    "name": "#string"   (required)
}
```

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "name": "#string"
}
```

**DELETE /api/genres/{id}**

Response:

Status code: 200

### 2. Movies

**POST /api/movies**

Request:
```
{
    "title": "#string",  (required)
    "genreId": "#objectId",    (required)
    "numberInStock": "#number",  (required)
    "dailyRentalRate": "#number"    (required)
}
```

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "title": "#string",
    "genre": {
        "_id": "#objectId",
        "name": "#string",
    },
    "numberInStock": "#number",
    "dailyRentalRate": "#number"
}
```

**GET /api/movies**

Response:

Status code: 200
```
[
    {
        "_id": "#objectId",
        "title": "#string",
        "genre": {
            "_id": "#objectId",
            "name": "#string",
        },
        "numberInStock": "#number",
        "dailyRentalRate": "#number"
    }
]
```

**GET /api/movies/{id}**

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "title": "#string",
    "genre": {
        "_id": "#objectId",
        "name": "#string",
    },
    "numberInStock": "#number",
    "dailyRentalRate": "#number"
}
```

**PUT /api/movies/{id}**

Request:
```
{
    "title": "#string",  (required)
    "genreId": "#objectId",    (required)
    "numberInStock": "#number",  (required)
    "dailyRentalRate": "#number"    (required)
}
```

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "title": "#string",
    "genre": {
        "_id": "#objectId",
        "name": "#string",
    },
    "numberInStock": "#number",
    "dailyRentalRate": "#number"
}
```

**DELETE /api/movies/{id}**

Response:

Status code: 200

### 3. Customers

**POST /api/customers**

Request:
```
{
    "name": "#string",  (required)
    "phone": "#string",    (required)
    "isGold": "#boolean"  (required)
}
```

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "name": "#string",
    "phone": "#string",
    "isGold": "#boolean"
}
```

**GET /api/customers**

Response:

Status code: 200
```
[
    {
        "_id": "#objectId",
        "name": "#string",
        "phone": "#string",
        "isGold": "#boolean"
    }
]
```

**GET /api/customers/{id}**

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "name": "#string",
    "phone": "#string",
    "isGold": "#boolean"
}
```

**PUT /api/customers/{id}**

Request:
```
{
    "name": "#string",  (required)
    "phone": "#string",    (required)
    "isGold": "#boolean"  (required)
}
```

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "name": "#string",
    "phone": "#string",
    "isGold": "#boolean"
}
```

**DELETE /api/customers/{id}**

Response:

Status code: 200

### 4. Rentals

**POST /api/rentals**

Request:
```
{
    "customerId": "#objectId",  (required)
    "movieId": "#objectId"    (required)
}
```

Response:

Status code: 200
```
{
    "_id": "#objectId",
    "customer": {
            "_id": "#objectId",
            "name": "#string",
            "phone": "#string".
            "isGold": "#boolean"
        },
    "movie": {
        "_id": "#objectId",
        "title": "#string",
        "dailyRentalRate": "#number"
    }
}
```

**GET /api/rentals**

Response:

Status code: 200
```
[
    {
        "_id": "#objectId",
        "customer": {
            "_id": "#objectId",
            "name": "#string",
            "phone": "#string".
            "isGold": "#boolean"
        },
        "movie": {
            "_id": "#objectId",
            "title": "#string",
            "dailyRentalRate": "#number"
        }
    }
]
```
