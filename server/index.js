#!/usr/bin/env node

const config = require('./config');
const app = require('./app');
const logger = require('./logger');

function handleError(err, ctx) {
  if (!ctx) {
    logger.error({ err, event: 'error' }, 'Unhandled exception occured');
  }
}

async function terminate(signal) {
  try {
    await app.terminate();
  } finally {
    logger.info({ signal, event: 'terminate' }, 'App is terminated');
    process.kill(process.pid, signal);
  }
}

app.on('error', handleError);

// Start server
if (!module.parent) {
  const server = app.listen(config.port, config.host, () => {
    logger.info(
      { event: 'execute' },
      `API server listening on ${config.host}:${config.port}, in ${config.env}`,
    );
  });
  server.on('error', handleError);

  const errors = ['unhandledRejection', 'uncaughtException'];
  errors.map(error => process.on(error, handleError));

  const signals = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signals.map(signal => process.once(signal, () => terminate(signal)));
}

module.exports = app;
