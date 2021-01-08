const request = require('supertest');
const config = require('config');

const Constants = require('../../src/util/constants');
const { User } = require('../../src/model/user');

const JWT_TOKEN = config.get('JWT_TOKEN');
const USER_ID = '5fd488f1c16df6193f0ad39d';

let server;

describe('/api/users', () => {
  beforeEach(async () => {
    server = require('../../src/index');
  });

  afterEach(async () => {
    server.close();

    await User.deleteMany({});
  });

  describe('POST', () => {
    it('Create User with all required fields.', async () => {
      let res = await request(server)
        .post('/api/users')
        .send({
          name: 'Jennifer',
          email: 'jenny@gmail.com',
          password: '123456',
        });
      expect(res.status).toBe(200);
      expect(res.body.name === 'Jennifer').toBeTruthy();
      expect(res.body.email === 'jenny@gmail.com').toBeTruthy();
    });

    it('Create User - With missing fields in request payload.', async () => {
      let res = await request(server)
        .post('/api/users')
        .send({
          name: 'Jennifer',
          email: 'jenny@gmail.com',
          password: '',
        });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /:id', () => {
    let savedUser
    beforeEach(async () => {
      // Create test user
      let user = new User({
        _id: USER_ID,
        name: 'Saubi',
        email: 'saubi@gmail.com',
        password: '123456',
        isAdmin: true
      });
      await user.save();
    });

    it('Get User by Id - Success.', async () => {
      let res = await request(server)
        .get(`/api/users/${USER_ID}`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.name === 'Saubi').toBeTruthy();
      expect(res.body.email === 'saubi@gmail.com').toBeTruthy();
    });

    it('Get User by Id - Not the logged in user.', async () => {
      let res = await request(server)
        .get(`/api/users/5fd49575f3c5da2dba37b4f5`)
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(403);
    });
  });
});
