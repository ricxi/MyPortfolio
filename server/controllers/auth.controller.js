const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const config = require('../../config/config.js');

const signin = async (req, res) => {
  try {
    if (!req.body.email) throw new Error('Missing email field.');
    if (!req.body.password) throw new Error('Missing password field.');

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
    return res.status(401).json({ error: err.message });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'signed out',
  });
};

module.exports = { signin, signout };
