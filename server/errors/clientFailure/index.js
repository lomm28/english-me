const ApplicationError = require('../applicationError');

/**
 * Thrown when the client send an invalid request.
 */
class ClientFailure extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'ClientFailure';
  }
}

module.exports = ClientFailure;