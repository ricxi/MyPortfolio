class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

function getErrorMessage(err) {
  return err.message;
}

module.exports = {
  getErrorMessage,
  AuthenticationError,
  UnauthorizedError,
};
