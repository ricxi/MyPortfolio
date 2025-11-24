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

class MissingFieldsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingFieldsError';
  }
}

const getErrorMessage = (err) => {
  if (!err) return 'Null or undefined error: something went wrong';

  if (err instanceof Error && !err.code && !err.errors) {
    return err.message || 'Something went wrong';
  }

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        const dupErr = getDuplicateKeyErrorMessage(err);
        return dupErr;
      default:
        return err.message;
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  if (err instanceof Error) return err.message;

  return err;
};

const getDuplicateKeyErrorMessage = (err) => {
  try {
    if (!err.errorResponse)
      return `Duplicate key error parsing failed: ${err.message}`;

    const keyValue = err.errorResponse.keyValue;
    if (keyValue && typeof keyValue === 'object') {
      const [field, value] = Object.entries(keyValue)[0] || [];

      if (field && typeof value !== 'undefined') {
        return `The ${field} "${value}" already exists.`;
      }
    }
  } catch (ex) {
    return `Unexpected duplicate key error caught failed parsing: ${ex.message}`;
  }

  return 'Duplicate key error parsing found nothing';
};

module.exports = {
  getErrorMessage,
  AuthenticationError,
  UnauthorizedError,
};
