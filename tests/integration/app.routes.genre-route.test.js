const request = require('supertest');
// const jwt = require('jsonwebtoken');

// const config = require('config');
const { Genre } = require('../../model/genre');

let server;

describe('/api/genres', () => {
    beforeEach(() => {
        server = require('../../index');
    });

    afterEach(async () => {
        server.close();

        await Genre.remove({});
    });

    describe('POST', () => {
        it('Create genre with all required fields.', async () => {
            // const jwtPayload = {
            //     _id: '1',
            //     name: 'Saubhagya',
            //     email: 'sau@gmail.com',
            //     isAdmin: false
            // };
            // const token = jwt.sign(jwtPayload, config.get('PVT_KEY'));

            let res = await request(server)
                .post('/api/genres')
                // .set('x-jwt-assertion', token)
                .send({ name: 'Genre 1' });
            expect(res.status).toBe(200);
        });
    });

    describe('GET /', () => {
        it('Get all genres.', async () => {
            await Genre.collection.insertMany([
                { name: 'Genre 1', createdBy: 'sau@gmail.com', updatedBy: 'sau@gmail.com' },
                { name: 'Genre 2', createdBy: 'sau@gmail.com', updatedBy: 'sau@gmail.com' }
            ]);

            let res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'Genre 1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'Genre 2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('Get genre by Id.', async () => {
            let genre = new Genre({ name: 'Genre 1', createdBy: 'sau@gmail.com', updatedBy: 'sau@gmail.com' });
            await genre.save();

            let res = await request(server).get(`/api/genres/${genre.id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });
    });
});
