const knex = require('knex');
const conf = require('../../knexfile');

const configuration = (process.env.NODE_ENV === 'test') ? conf.test : conf.development;

const conn = knex(configuration);

module.exports = conn;