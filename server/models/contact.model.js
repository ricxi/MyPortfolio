const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'First name field is required',
  },

  lastname: {
    type: String,
    trim: true,
    required: 'Last name field is required',
  },

  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please provide a valid email address'],
    required: 'Email field is required',
  },
});

module.exports = mongoose.model('Contact', ContactSchema);
