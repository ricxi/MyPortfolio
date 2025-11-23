const User = require('../models/user.model.js');
const { UnauthorizedError } = require('../controllers/error.controller.js');

const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user) throw new AuthenticationError('Missing user from request');
    if (!req.user._id)
      throw new AuthenticationError('Missing user id from request');

    const userId = req.user._id;
    const user = await User.findById(userId).select('_id role');
    if (!user) throw new Error('User not found'); // Should be a 404

    if (user._id.toHexString() !== userId)
      throw new UnauthorizedError(
        'Invalid user id: request id does not match database id',
      );

    if (user.role !== 'admin')
      throw new UnauthorizedError('User is not authorized as admin');

    next();
  } catch (err) {
    res.status(403);
    throw err;
  }
};

module.exports = { requireAdmin };
