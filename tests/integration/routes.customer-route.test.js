const request = require('supertest');
const config = require('config');

const Constants = require('../../src/util/constants');
const { Customer } = require('../../src/model/customer');
const { User } = require('../../src/model/user');

const JWT_TOKEN = config.get('JWT_TOKEN');

let server;

describe('/api/customers', () => {
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

    await Customer.deleteMany({});
    await User.deleteMany({});
  });

  describe('Authentication layer', () => {
    it('Create Customer with no authentication header.', async () => {
      let res = await request(server)
        .post('/api/customers')
        .send({
          fName: 'Jane',
          lName: 'Doe',
          phone: '0123456789',
        });
      expect(res.status).toBe(401);
    });

    it('Create Customer with invalid authentication header.', async () => {
      let res = await request(server)
        .post('/api/customers')
        .set(Constants.AUTH_HEADER, 'Invalid authentication header')
        .send({
          fName: 'Jane',
          lName: 'Doe',
          phone: '0123456789',
        });
      expect(res.status).toBe(401);
    });
  });

  describe('POST', () => {
    it('Create Customer with all required fields.', async () => {
      let res = await request(server)
        .post('/api/customers')
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({
          fName: 'Jane',
          lName: 'Doe',
          phone: '0123456789',
        });
      expect(res.status).toBe(200);
      expect(res.body.fName === 'Jane').toBeTruthy();
      expect(res.body.lName === 'Doe').toBeTruthy();
      expect(res.body.phone === '0123456789').toBeTruthy();
    });

    it('Create Customer - With missing fields in request payload.', async () => {
      let res = await request(server)
        .post('/api/customers')
        .set(Constants.AUTH_HEADER, JWT_TOKEN)
        .send({
          fName: 'Jane',
          lName: 'Doe',
          phone: '',
        });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /', () => {
    it('Get all Customers - Success.', async () => {
      await Customer.collection.insertMany([
        {
          fName: 'Jane',
          lName: 'Doe',
          phone: '0123456789',
          createdBy: 'sau@gmail.com',
          updatedBy: 'sau@gmail.com'
        },
        {
          fName: 'John',
          lName: 'Smith',
          phone: '0456789123',
          createdBy: 'sau@gmail.com',
          updatedBy: 'sau@gmail.com'
        }
      ]);

      let res = await request(server)
        .get('/api/customers')
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.fName === 'Jane' && g.lName === 'Doe')).toBeTruthy();
      expect(res.body.some((g) => g.fName === 'John' && g.lName === 'Smith')).toBeTruthy();
    });

    it('Get all Customers - When no Customers exist in the DB.', async () => {
      let res = await request(server)
        .get('/api/customers')
        .set(Constants.AUTH_HEADER, JWT_TOKEN);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
    });
  });
});
