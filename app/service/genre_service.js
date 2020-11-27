const GenreRepository = require('../repository/genre_repository');
const genreRepository = new GenreRepository();

const _buildGenre = Symbol();

class GenreService {
    async createGenre(payload) {
        try {
            let genre = this[_buildGenre](payload);
            return await genreRepository.createGenre(genre);
        } catch (err) {
            throw err;
        }
    }

    async getGenres(pageNum) {
        try {
            return await genreRepository.getGenres(pageNum);
        } catch (err) {
            throw err;
        }
    }

    async getGenreById(id) {
        try {
            return await genreRepository.getGenreById(id);
        } catch (err) {
            throw err;
        }
    }

    async updateGenre(id, payload) {
        try {
            return await genreRepository.updateGenre(id, payload);
        } catch (err) {
            throw err;
        }
    }

    async deleteGenre(id) {
        try {
            return await genreRepository.deleteGenre(id);
        } catch (err) {
            throw err;
        }
    }

    [_buildGenre](payload) {
        return new Genre({
            name: payload.name
        });
    }
}

module.exports = GenreService;
