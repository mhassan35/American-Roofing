
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    trim: true,
    default: ''
  },
  source: {
    type: String,
    default: 'Website Form'
  },
  urgency: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String, // Base64 encoded image or URL
    default: ''
  },
  status: {
    type: String,
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This automatically handles createdAt and updatedAt
});

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;