const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bukutamu_app', 'username', 'password', {
    host:'localhost',
    dialect: 'mysql',

});

module.exports = sequelize;