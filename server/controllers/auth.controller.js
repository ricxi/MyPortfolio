const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');
const config = require('../../config/config.js');
const {
  AuthenticationError,
  UnauthorizedError,
} = require('./error.controller.js');

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ error: 'User not found.' });
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'signed out',
  });
};

const requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization || null;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401);
    throw new AuthenticationError('Failed to authenticate user');
  }

  const [, bearerToken] = req.headers.authorization.split(' ');
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

module.exports = { signin, signout, requireSignin, hasAuthorization };
