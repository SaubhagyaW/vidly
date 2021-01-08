const request = require('supertest');
const config = require('config');

const Constants = require('../../src/util/constants');
const { Movie } = require('../../src/model/movie');
const { Genre } = require('../../src/model/genre');
const { User } = require('../../src/model/user');

const JWT_TOKEN = config.get('JWT_TOKEN');

const genreData = {
  name: 'Thriller',
  createdBy: 'sau@gmail.com',
  updatedBy: 'sau@gmail.com'
};

let server;

describe('/api/movies', () => {
  beforeEach(async () => {
    server = require('../../src/index');

    // Create test user
    let user = new User({
      name: 'Saubi',
      email: 'saubi@gmail.com',
      password: '123456',
      isAdmin: true
    });
    await user.save();
  });

  afterEach(async () => {
    server.close();

    await Movie.deleteMany({});
    await Genre.deleteMany({});
    await User.deleteMany({});
  });

  describe('Authentication layer', () => {
    it('Create movie with no authentication header.', async () => {
      let res = await request(server)
        .post('/api/movies')
        .send({
          title: 'Die Hard',
          genreId: '5fd49575f3c5da2dba37b4f5',
          numberInStock: 5,
          dailyRentalRate: 8
        });
      expect(res.status).toBe(401);
    });

    it('Create movie with invalid authentication header.', async () => {
      let res = await request(server)
        .post('/api/movies')
        .set(Constants.AUTH_HEADER, 'Invalid authentication header')
        .send({
          title: 'Die Hard',
          genreId: '5fd49575f3c5da2dba37b4f5',
          numberInStock: 5,
          dailyRentalRate: 8
        });
      expect(res.status).toBe(401);
    });
  });

  describe('POST', () => {
    it('Create movie with all required fields.', async () => {
      let genre = new Genre(genreData)
      let savedGenre = await genre.save();

      let res = await request(server)
        .post('/api/movies')
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({
          title: 'Die Hard',
          genreId: savedGenre.id,
          numberInStock: 5,
          dailyRentalRate: 8
        });
      expect(res.status).toBe(200);
      expect(res.body.title === 'Die Hard').toBeTruthy();
      expect(res.body.genre._id === savedGenre.id).toBeTruthy();
      expect(res.body.numberInStock === 5).toBeTruthy();
      expect(res.body.dailyRentalRate === 8).toBeTruthy();
    });

    it('Create movie - With missing fields in request payload.', async () => {
      let genre = new Genre(genreData)
      await genre.save();

      let res = await request(server)
        .post('/api/movies')
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({
          title: 'Die Hard',
          genreId: '',
          numberInStock: 5,
          dailyRentalRate: 8
        });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /', () => {
    it('Get all Movies - Success.', async () => {
      let genre = new Genre(genreData)
      let savedGenre = await genre.save()

      await Movie.collection.insertMany([
        {
          title: 'Die Hard',
          genre: {
            _id: savedGenre.id,
            name: savedGenre.name
          },
          numberInStock: 5,
          dailyRentalRate: 8,
          createdBy: 'sau@gmail.com',
          updatedBy: 'sau@gmail.com'
        },
        {
          title: 'The Notebook',
          genre: {
            _id: savedGenre.id,
            name: savedGenre.name
          },
          numberInStock: 5,
          dailyRentalRate: 8,
          createdBy: 'sau@gmail.com',
          updatedBy: 'sau@gmail.com'
        }
      ]);

      let res = await request(server)
        .get('/api/movies')
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) =>
        g.title === 'Die Hard' && g.genre._id === savedGenre.id && g.numberInStock === 5 && g.dailyRentalRate === 8))
        .toBeTruthy();
      expect(res.body.some((g) =>
        g.title === 'The Notebook' && g.genre._id === savedGenre.id && g.numberInStock === 5 && g.dailyRentalRate === 8))
        .toBeTruthy();
    });

    it('Get all Movies - When no Movies exist in the DB.', async () => {
      let res = await request(server)
        .get('/api/movies')
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET /:id', () => {
    it('Get Movie by Id - Success.', async () => {
      let genre = new Genre(genreData)
      let savedGenre = await genre.save()

      let movie = new Movie({
        title: 'Die Hard',
        genre: {
          _id: savedGenre.id,
          name: savedGenre.name
        },
        numberInStock: 5,
        dailyRentalRate: 8,
        createdBy: 'sau@gmail.com',
        updatedBy: 'sau@gmail.com'
      });
      let savedMovie = await movie.save();

      let res = await request(server)
        .get(`/api/movies/${savedMovie.id}`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.title === 'Die Hard').toBeTruthy();
      expect(res.body.genre._id === savedGenre.id).toBeTruthy();
      expect(res.body.numberInStock === 5).toBeTruthy();
      expect(res.body.dailyRentalRate === 8).toBeTruthy();
    });

    it('Get Movie by Id - When no Movie exists in the DB.', async () => {
      let res = await request(server)
        .get(`/api/movies/5fd49575f3c5da2dba37b4f5`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(404);
    });

    it('Get Movie by Id - Invalid Id.', async () => {
      let res = await request(server)
        .get(`/api/movies/123`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /:id', () => {
    it('Update Movie - Success.', async () => {
      let genre = new Genre(genreData)
      let savedGenre = await genre.save()

      let movie = new Movie({
        title: 'Die Hard',
        genre: {
          _id: savedGenre.id,
          name: savedGenre.name
        },
        numberInStock: 5,
        dailyRentalRate: 8,
        createdBy: 'sau@gmail.com',
        updatedBy: 'sau@gmail.com'
      });
      let savedMovie = await movie.save();

      let res = await request(server)
        .put(`/api/movies/${savedMovie.id}`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({
          title: 'Die Hard 2',
          genreId: genre.id,
          numberInStock: 5,
          dailyRentalRate: 8
        });

      expect(res.status).toBe(200);
      expect(res.body.title === 'Die Hard 2').toBeTruthy();
      expect(res.body.genre._id === savedGenre.id).toBeTruthy();
      expect(res.body.numberInStock === 5).toBeTruthy();
      expect(res.body.dailyRentalRate === 8).toBeTruthy();
    });

    it('Update Movie - When no Movie exists in the DB.', async () => {
      let genre = new Genre(genreData)
      let savedGenre = await genre.save()

      let res = await request(server)
        .put(`/api/movies/5fd49575f3c5da2dba37b4f5`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({
          title: 'Die Hard 2',
          genreId: savedGenre.id,
          numberInStock: 5,
          dailyRentalRate: 8
        });

      expect(res.status).toBe(404);
    });

    it('Update Movie - With missing fields in request payload.', async () => {
      let res = await request(server)
        .put(`/api/movies/123`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({
          title: 'Die Hard 2',
          genreId: '5fd49575f3c5da2dba37b421',
          numberInStock: 5,
          dailyRentalRate: 8
        });

      expect(res.status).toBe(400);
    });

    it('Update Movie - Invalid Id.', async () => {
      let res = await request(server)
        .put(`/api/movies/123`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({
          title: 'Die Hard 2',
          genreId: '5fd49575f3c5da2dba37b421',
          numberInStock: 5,
          dailyRentalRate: 8
        });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /:id', () => {
    it('Delete Movie - Success.', async () => {
      let genre = new Genre(genreData)
      let savedGenre = await genre.save()

      let movie = new Movie({
        title: 'Die Hard',
        genre: {
          _id: savedGenre.id,
          name: savedGenre.name
        },
        numberInStock: 5,
        dailyRentalRate: 8,
        createdBy: 'sau@gmail.com',
        updatedBy: 'sau@gmail.com'
      });
      let savedMovie = await movie.save();

      let res = await request(server)
        .get(`/api/movies/${savedMovie.id}`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body._id === savedMovie.id).toBeTruthy();
    });

    it('Delete Movie - When no Movie exists in the DB.', async () => {
      let res = await request(server)
        .get(`/api/movies/5fd49575f3c5da2dba37b4f5`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(404);
    });

    it('Delete Movie - Invalid Id.', async () => {
      let res = await request(server)
        .get(`/api/movies/123`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(400);
    });
  });
});
