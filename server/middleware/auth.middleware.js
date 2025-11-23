const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
const {
  AuthenticationError,
  UnauthorizedError,
} = require('../controllers/error.controller.js');

const requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401);
    throw new AuthenticationError('Missing authorization header');
  }

  const testToken = authHeader.split(' ')[1];
  console.log('Test Token **************************************');
  console.log(authHeader.startsWith('Bearer'));
  console.log(authHeader);
  console.log(testToken);
  console.log('**************************************');

  if (!authHeader.startsWith('Bearer')) {
    res.status(401);
    throw new AuthenticationError('Failed to authenticate user');
  }

  const bearerToken = req.headers.authorization.split(' ')[1];
  console.log(bearerToken);
  try {
    jwt.verify(bearerToken, config.jwtSecret);
    next();
  } catch (err) {
    res.status(401);
    throw err;
  }
};

const hasAuthorization = async (req, res, next) => {
  const authorized = req.headers.authorization || null;
  if (!authorized || !authorized.startsWith('Bearer')) {
    res.status(403);
    throw new UnauthorizedError('User is not authorized');
  }
  const [, bearerToken] = req.headers.authorization.split(' ');

  try {
    const decodedBearerToken = jwt.verify(bearerToken, config.jwtSecret);

    if (decodedBearerToken._id !== req.params.id) {
      return res.status(403).json({ error: 'User is not authorized' });
    }

    next();
  } catch (error) {
    res.status(403);
    throw err;
  }
};

module.exports = { requireSignin, hasAuthorization };
