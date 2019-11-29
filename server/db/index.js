const Sequelize = require('sequelize');
const config = require('../config');

const { database, databaseUser, databasePwd, databaseHost } = config;

const sequelize = new Sequelize(database, databaseUser, databasePwd, {
  dialect: 'mysql',
  host: databaseHost,
  dialectOptions: {
    ssl: 'Amazon RDS',
  },
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database: ', err));

module.exports = sequelize;
