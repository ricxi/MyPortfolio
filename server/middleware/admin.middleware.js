const requireAdmin = (req, res, next) => {
  try {
    // if (res.body.isAdmin) throw new Error('Missing isAdmin field');
    // if (!res.body.isAdmin) throw new Error('Must be admin to access');
    next();
  } catch (err) {
    res.status(403);
    throw err;
  }
};

module.exports = { requireAdmin };
