const Qualification = require('../models/qualification.model.js');
const errorHandler = require('./error.controller.js');

const create = async (req, res) => {
  const qualification = new Qualification(req.body);

  try {
    const result = await qualification.save();
    if (!result)
      return res.status(400).json({
        error: 'Problem creating qualification.',
      }); // ?Check if an error always give an empty result?

    return res.status(201).json({
      message: 'Qualification has been added.',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getAll = async (req, res) => {
  try {
    const qualifications = await Qualification.find().select(
      '_id title firstname lastname email completion description',
    );
    return res.json(qualifications);
    // ? What happens if qualifications not found?
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getById = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id).select(
      '_id title firstname lastname email completion description',
    );
    if (!qualification)
      return res.status(404).json({
        error: 'Qualification not found.',
      });

    return res.status(200).json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const updateById = async (req, res) => {
  const qualification = req.body;
  try {
    const updatedQualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      qualification,
      {
        new: true,
        runValidators: true,
      },
    ).select('_id title firstname lastname email completion description');
    if (!updatedQualification)
      return res.status(404).json({ error: 'Qualification not found.' });

    return res.json(updatedQualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const deletedQualification = await Qualification.findByIdAndDelete(
      req.params.id,
    ).select('_id');

    if (!deletedQualification)
      return res.status(404).json({ error: 'Qualification not found.' });

    return res.json({
      ...deletedQualification.toJSON(),
      deleted: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const deleteAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    if (!result) return res.json({ error: 'problem deleting qualifications' });

    return res.json({ message: 'successfully deleted all qualifications' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = { create, getAll, getById, updateById, deleteById, deleteAll };
