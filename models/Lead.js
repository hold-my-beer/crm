const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'company'
  },
  broker: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'broker'
  },
  contactPerson: {
    type: String,
    required: true
  },
  renewalDate: {
    type: Date,
    required: true
  },
  contactDate: {
    type: Date,
    required: true
  },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  copyTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  premium: {
    type: Number
  },
  comment: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Lead = mongoose.model('lead', LeadSchema);
