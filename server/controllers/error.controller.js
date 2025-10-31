function handleError(req, res) {
  // Your code to handle the error
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
  handleError,
  getErrorMessage,
};
