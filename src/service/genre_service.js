const _ = require('lodash');

const { Genre } = require('../model/genre');
const GenreRepository = require('../repository/genre_repository');
const UserRepository = require('../repository/user_repository');

const _buildGenre = Symbol();

// Service layer for Genre related operations
module.exports = class GenreService {
    constructor() {
        this.genreRepository = new GenreRepository();
        this.userRepository = new UserRepository();
    }

    async createGenre(payload, user) {
        try {
            let genre = await this[_buildGenre](payload, user.email);
            return await this.genreRepository.createGenre(genre);
        } catch (err) {
            throw err;
        }
    }

    async getGenres() {
        try {
            return await this.genreRepository.getGenres();
        } catch (err) {
            throw err;
        }
    }

    // async getGenreById(id) {
    //     try {
    //         return await this.genreRepository.getGenreById(id);
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async updateGenre(id, payload, user) {
    //     try {
    //         let genre = await this.genreRepository.getGenreById(id);
    //         if (payload.name !== genre.name) {
    //             logger.error('Genre.name field cannot be updated');
    //             throw new Error('Genre.name field cannot be updated');
    //         }

    //         payload.updatedBy = await this.userRepository.getUserIdByEmail(user.email);
    //         return await this.genreRepository.updateGenre(id, payload);
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async deleteGenre(id) {
    //     try {
    //         return await this.genreRepository.deleteGenre(id);
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    async [_buildGenre](payload, email) {
        let genre = new Genre(_.pick(payload, ['name']));

        try {
            let userId = await this.userRepository.getUserIdByEmail(email);
            genre.createdBy = userId;
            genre.updatedBy = userId;
            return genre;
        } catch (err) {
            throw err;
        }
    }
};
