const Project = require('../models/project.model.js');
const errorHandler = require('./error.controller.js');

const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    const result = await project.save();
    if (!result)
      res.status(400).json({
        error: 'Problem creating project.',
      }); // ?Check if an error always give an empty result?

    return res.status(201).json({
      message: 'Project has been created.',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getAll = async (req, res) => {
  try {
    const projects = await Project.find().select(
      '_id title firstname lastname email completion description'
    );
    return res.json(projects);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// TODO: validate that req.params.id is not empty or not int
const getById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select(
      '_id title firstname lastname email completion description'
    );
    if (!project)
      return res.status(404).json({
        error: 'Project not found.',
      });

    return res.status(200).json(project);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// TODO: validate that req.params.id is not empty or not int
const updateById = async (req, res) => {
  const project = req.body;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      project,
      {
        new: true,
        runValidators: true,
      }
    ).select('_id title firstname lastname email completion description');
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    return res.json(updatedProject);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// TODO: validate that req.params.id is not empty or not int
const deleteById = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(
      req.params.id
    ).select('_id'); // TODO

    if (!deletedProject)
      return res.status(404).json({ error: 'Project not found.' });

    return res.json({
      ...deletedProject.toJSON(),
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
    const result = await Project.deleteMany({});
    if (!result) return res.json({ error: 'problem deleting projects' });

    return res.json({ message: 'successfully deleted all projects' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = { create, getAll, getById, updateById, deleteById, deleteAll };
