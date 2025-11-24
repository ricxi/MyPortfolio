const User = require('../models/user.model.js');
const { UnauthorizedError } = require('../controllers/error.controller.js');

const requireAdmin = async (req, res, next) => {
  try {
    if (!req.user)
      throw new AuthenticationError(
        'Missing user data in request: unable to grant admin access',
      );
    if (!req.user._id)
      throw new AuthenticationError(
        'Missing user id in: unable to grant admin access',
      );

    const userId = req.user._id;
    const user = await User.findById(userId).select('_id role');
    if (!user) throw new Error(`User or admin not found for id: ${userId}`); // Should be a 404

    if (user._id.toHexString() !== userId)
      throw new UnauthorizedError(
        'Invalid user id: request id does not match id found in database.',
      );

    if (user.role !== 'admin')
      throw new UnauthorizedError(
        'Unauthorized: Only an ADMIN can perform this action.',
      );

    next();
  } catch (err) {
    res.status(403);
    throw err;
  }
};

module.exports = { requireAdmin };
