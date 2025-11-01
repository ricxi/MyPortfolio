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
  if (err.name === 'ValidationError') {
    return {
      error: 'invalid or missing fields',
    };
  }

  return err.message;
}

module.exports = {
  getErrorMessage,
  AuthenticationError,
  UnauthorizedError,
};
