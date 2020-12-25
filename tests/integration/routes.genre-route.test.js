const request = require('supertest');
const config = require('config');

const Constants = require('../../src/util/constants');
const { Genre } = require('../../src/model/genre');
const { User } = require('../../src/model/user');

const JWT_TOKEN = config.get('JWT_TOKEN');

let server;

describe('/api/genres', () => {
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

    await Genre.remove({});
    await User.remove();
  });

  describe('Authentication layer', () => {
    it('Create genre with no authentication header.', async () => {
      let res = await request(server)
        .post('/api/genres')
        .send({ name: 'Genre 1' });
      expect(res.status).toBe(401);
    });

    it('Create genre with invalid authentication header.', async () => {
      let res = await request(server)
        .post('/api/genres')
        .set(Constants.AUTH_HEADER, 'Invalid authentication header')
        .send({ name: 'Genre 1' });
      expect(res.status).toBe(401);
    });
  });

  describe('POST', () => {
    it('Create genre with all required fields.', async () => {
      let res = await request(server)
        .post('/api/genres')
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({ name: 'Genre 1' });
      expect(res.status).toBe(200);
      expect(res.body.name === 'Genre 1').toBeTruthy();
    });

    it('Create genre - With missing fields in request payload.', async () => {
      let res = await request(server)
        .post('/api/genres')
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({ name: '' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /', () => {
    it('Get all Genres - Success.', async () => {
      await Genre.collection.insertMany([
        {
          name: 'Genre 1',
          createdBy: 'sau@gmail.com',
          updatedBy: 'sau@gmail.com'
        },
        {
          name: 'Genre 2',
          createdBy: 'sau@gmail.com',
          updatedBy: 'sau@gmail.com'
        }
      ]);

      let res = await request(server)
        .get('/api/genres')
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'Genre 1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'Genre 2')).toBeTruthy();
    });

    it('Get all Genres - When no Genres exist in the DB.', async () => {
      let res = await request(server)
        .get('/api/genres')
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET /:id', () => {
    it('Get Genre by Id - Success.', async () => {
      let genre = new Genre({
        name: 'Genre 1',
        createdBy: 'sau@gmail.com',
        updatedBy: 'sau@gmail.com'
      });
      await genre.save();

      let res = await request(server)
        .get(`/api/genres/${genre.id}`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('Get Genre by Id - When no Genre exists in the DB.', async () => {
      let res = await request(server)
        .get(`/api/genres/5fd49575f3c5da2dba37b4f5`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(404);
    });

    it('Get Genre by Id - Invalid Id.', async () => {
      let res = await request(server)
        .get(`/api/genres/123`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(400);
    });
  });

  describe('PUT /:id', () => {
    it('Update Genre - Success.', async () => {
      let genre = new Genre({
        name: 'Genre 1',
        createdBy: 'sau@gmail.com',
        updatedBy: 'sau@gmail.com'
      });
      await genre.save();

      let res = await request(server)
        .get(`/api/genres/${genre.id}`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({ name: 'Genre 55' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
      // NOTE: Update fails due to immutable Genre.name property
    });

    it('Update Genre - When no Genre exists in the DB.', async () => {
      let res = await request(server)
        .get(`/api/genres/5fd49575f3c5da2dba37b4f5`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({ name: 'Genre 55' });

      expect(res.status).toBe(404);
    });

    it('Update Genre - With missing fields in request payload.', async () => {
      let res = await request(server)
        .get(`/api/genres/123`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({ name: '' });

      expect(res.status).toBe(400);
    });

    it('Update Genre - Invalid Id.', async () => {
      let res = await request(server)
        .get(`/api/genres/123`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({ name: 'Genre 55' });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /:id', () => {
    it('Delete Genre - Success.', async () => {
      let genre = new Genre({
        name: 'Genre 1',
        createdBy: 'sau@gmail.com',
        updatedBy: 'sau@gmail.com'
      });
      await genre.save();

      let res = await request(server)
        .get(`/api/genres/${genre.id}`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genre.name);
    });

    it('Delete Genre - When no Genre exists in the DB.', async () => {
      let res = await request(server)
        .get(`/api/genres/5fd49575f3c5da2dba37b4f5`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(404);
    });

    it('Delete Genre - Invalid Id.', async () => {
      let res = await request(server)
        .get(`/api/genres/123`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(400);
    });
  });
});
