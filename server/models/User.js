const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

User.sync()
  .then(() => console.log('User table created successfully'))
  .catch(err => console.log('Something went wrong', err));

module.exports = User;
