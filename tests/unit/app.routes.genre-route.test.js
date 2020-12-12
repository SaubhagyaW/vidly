const GenreService = require('../../src/service/genre_service');

const genreService = new GenreService();

describe('Genres Service Layer', () => {
    beforeEach(() => {
        jest.fn().mockClear();

        // Mock Test user
        jest.mock('../../src/repository/user_repository', () => {
            return jest.fn().mockImplementation(() => {
                return {
                    getUserIdByEmail: jest.fn().mockReturnValue({
                        name: 'Saubi',
                        email: 'saubi@gmail.com',
                        password: '123456',
                        isAdmin: true
                    })
                };
            });
        });
    });

    describe('Update Genre', () => {
        it('Update Genre - Update name field.', async () => {
            jest.mock('../../src/repository/genre_repository', () => {
                return jest.fn().mockImplementation(() => {
                    return {
                        getGenreById: jest.fn().mockReturnValue({
                            name: 'Genre 1',
                            createdBy: 'sau@gmail.com',
                            updatedBy: 'sau@gmail.com'
                        }),
                        updateGenre: jest.fn().mockReturnValue({
                            name: 'Genre 1',
                            createdBy: 'sau@gmail.com',
                            updatedBy: 'sau@gmail.com'
                        })   // Not used for this test. Added for Demo purposes.
                    };
                });
            });

            expect(() => { genreService.updateGenre(genre.id, genre, 'saubi@gmail.com') }).toThrow();
        });
    });
});
