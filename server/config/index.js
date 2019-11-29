const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'english-me-app',
    host: process.env.APP_HOST || '127.0.0.1',
    database: process.env.DB_NAME,
    databaseHost: process.env.DB_HOST,
    databaseUser: process.env.DB_USER,
    databasePwd: process.env.DB_PASSWORD,
    port: 7070,
  },
  production: {
    port: process.env.APP_PORT || 7071,
  },
  development: {
    port: process.env.APP_PORT,
  },
  test: {
    port: 7072,
  },
};

const config = Object.assign(configs.base, configs[env]);

module.exports = config;
