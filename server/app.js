const Koa = require('koa');
const logging = require('@kasa/koa-logging');
const requestId = require('@kasa/koa-request-id');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./logger');

class App extends Koa {
  constructor(...params) {
    super(...params);
    this.proxy = true;
    this.silent = this.evn !== 'development';
    this.servers = [];

    this._configureMiddlewares();
    this._configureRoutes();
  }

  _configureMiddlewares() {
    this.use(errorHandler());
    this.use(requestId());
    this.use(
      logging({
        logger,
        overrideSerializers: false,
      }),
    );
  }
}

const app = new App();

module.exports = app;
