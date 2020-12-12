const authenticate = require('../../../src/middleware/authenticate');
const generateAuthToken = require('../../../src/util/jwt_util');

const USER_ID = '5fd488f1c16df6193f0ad39d';

const user = {
    _id: 'USER_ID',
    name: 'Saubi',
    email: 'saubi@gmail.com',
    isAdmin: true
};

describe('Authentication middleware', () => {
    const jwtToken = generateAuthToken(user);

    // let req;
    // let res;
    // let next;

    beforeEach(() => {
        // Mock Test user
        jest.mock('../../../src/repository/user_repository', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    getUserIdByEmail: jest.fn().mockReturnValue('5fd488f1c16df6193f0ad39d')
                };
            });
        });
    });


    it('Authenticate with valid JWT token.', async () => {
        const req = {
            header: jest.fn().mockReturnValue(jwtToken)
        };
        const res = {};
        const next = jest.fn();

        authenticate(req, res, next);

        expect(req.user).toMatchObject(user);
    });

    // it('Authenticate with invalid JWT token.', async () => {
    //     const req = {
    //         header: jest.fn().mockReturnValue('1234')
    //     };
    //     const res = {}
    //     const next = jest.fn();

    //     authenticate(req, res, next);

    //     expect(req.status).toBe(401);
    // });
});
