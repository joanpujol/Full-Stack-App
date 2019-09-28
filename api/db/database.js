const Sequelize = require('sequelize');

const db = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db'
});

module.exports = db;
