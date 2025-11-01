const Contact = require('../models/contact.model.js');
const errorHandler = require('./error.controller.js');

// TODO: error message and test if contact already exists
const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const result = await contact.save();
    if (!result)
      return res.status(400).json({
        error: 'Problem creating contact.',
      });

    return res.status(201).json({
      message: 'Contact has been created.',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find().select(
      '_id firstname lastname email'
    );
    return res.json(contacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// TODO: validate that req.params.id is not empty or not int
const getById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select(
      '_id firstname lastname email '
    );
    if (!contact)
      return res.status(404).json({
        error: 'Contact not found.',
      });

    return res.status(200).json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// TODO: validate that req.params.id is not empty or not int
const updateById = async (req, res) => {
  const contact = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      contact,
      {
        new: true,
        runValidators: true,
      }
    ).select('_id firstname lastname email');
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }

    return res.json(updatedContact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// TODO: validate that req.params.id is not empty or not int
const deleteById = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(
      req.params.id
    ).select('_id firstname lastname email');

    if (!deletedContact)
      return res.status(404).json({ error: 'Contact not found.' });

    return res.json({
      ...deletedContact.toJSON(),
      deleted: true,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// TODO: I should find a way to validate that everything was actually deleted
const deleteAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    if (!result) return res.json({ error: 'problem deleting contacts' });

    return res.json({ message: 'successfully deleted all contacts' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = { create, getAll, getById, updateById, deleteById, deleteAll };
