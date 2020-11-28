const _ = require('lodash');

const { Genre } = require('../model/genre');
const GenreRepository = require('../repository/genre_repository');
const UserRepository = require('../repository/user_repository');

const genreRepository = new GenreRepository();
const userRepository = new UserRepository();

const _buildGenre = Symbol();

// Service layer for Genre related operations
class GenreService {
    async createGenre(payload, user) {
        try {
            let genre = this[_buildGenre](payload, user.email);
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

    async updateGenre(id, payload, user) {
        try {
            payload.createdBy = userRepository.getUserIdByEmail(user.email);
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

    [_buildGenre](payload, email) {
        let genre = new Genre(_.pick(payload, ['name']));

        try {
            genre.createdBy = userRepository.getUserIdByEmail(email);
            return genre;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = GenreService;
