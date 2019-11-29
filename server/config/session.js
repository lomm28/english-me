require('dotenv').config();

const config = {
  server: {
    secret: process.env.SECRET_KEY,
  },
};

module.exports = config;
