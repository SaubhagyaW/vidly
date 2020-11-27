# vidly
Sample Node JS project for a Movie rental shop.

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
