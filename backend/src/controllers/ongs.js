const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.status(200).json(ongs);
    },

    async create(request, response) {
        const id = crypto.randomBytes(4).toString('HEX');
        const { name, email, whatsapp, city, uf } = request.body;

        await connection('ongs').insert({id, name, email, whatsapp, city, uf });

        return response.status(200).json({ id });
    }
}