const Koa = require('koa');
const logging = require('@kasa/koa-logging');
const requestId = require('@kasa/koa-request-id');
const session = require('koa-session');
const RedisStore = require('koa-redis');
const errorHandler = require('./middlewares/errorHandler');
const bodyParser = require('./middlewares/bodyParser');
const cors = require('./middlewares/cors');
const passport = require('./middlewares/passport');
const corsConfig = require('./config/cors');
const sessionSecret = require('./config/session');
const logger = require('./logger');
const miscRouter = require('./routes/misc');
const authRouter = require('./routes/auth');

class App extends Koa {
  constructor(...params) {
    super(...params);
    this.proxy = true;
    this.silent = this.evn !== 'development';
    this.servers = [];
    this.keys = [sessionSecret.server.secret];

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

    this.use(
      bodyParser({
        enableTypes: ['json'],
        jsonLimit: '10mb',
      }),
    );

    this.use(
      cors({
        origins: corsConfig.origins,
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
      }),
    );

    this.use(
      session(
        {
          store: new RedisStore(),
        },
        this,
      ),
    );

    this.use(passport.initialize());
    this.use(passport.session());
  }

  _configureRoutes() {
    this.use(miscRouter.routes());
    this.use(authRouter.routes());

    this.use(miscRouter.allowedMethods());
    this.use(authRouter.allowedMethods());
  }

  listen(...args) {
    const server = super.listen(...args);
    this.servers.push(server);
    return server;
  }

  async terminate() {
    // TODO: Implement graceful shutdown with pending request counter

    // eslint-disable-next-line
    for (const server of this.servers) {
      server.close();
    }
  }
}

const app = new App();

module.exports = app;
