
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
    enum: ['roof-replacement', 'roof-repair', 'gutter-installation', 'gutter-repair', 'siding-installation', 'siding-repair', 'inspection', 'emergency-repair', 'other']
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
    enum: ['urgent', 'within-week', 'within-month', 'flexible']
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['residential', 'commercial', 'industrial']
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
    enum: ['new', 'contacted', 'quoted', 'converted', 'closed'],
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