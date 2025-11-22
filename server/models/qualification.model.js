const mongoose = require('mongoose');

const QualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required',
  },

  description: {
    type: String,
    trim: true,
  },

  firstname: {
    type: String,
    trim: true,
  },

  lastname: {
    type: String,
    trim: true,
  },

  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please provide a valid email address'],
    required: 'Email is required',
  },

  completion: {
    type: Date,
  },
});

module.exports = mongoose.model('Qualification', QualificationSchema);
