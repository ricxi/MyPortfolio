const User = require('../models/user.model.js');
const errorHandler = require('./error.controller.js');

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    if (!result)
      return res.status(400).json({
        error: 'Problem creating user.',
      });

    return res.status(201).json({
      message: 'Successfully signed up!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select('_id name email updated created');
    return res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      '_id name email role created updated',
    );
    if (!user)
      return res.status(404).json({
        error: 'User not found.',
      });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};

const update = async (req, res) => {
  try {
    const user = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
      new: true,
      runValidators: true,
    }).select('_id name email created updated');

    updatedUser.updated = Date.now();
    await updatedUser.save();
    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).select(
      '_id name email',
    );
    if (!deletedUser) return res.status(404).json({ error: 'User not found.' });
    return res.json({
      ...deletedUser.toJSON(),
      deleted: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    if (!result) return res.json({ error: 'problem deleting users' });
    return res.json({ message: 'successfully deleted all users' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = {
  create,
  userByID,
  list,
  removeById,
  removeAll,
  update,
};
