const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  broker: {
    type: String,
    required: true
  },
  premium: {
    type: String
  },
  nextRenewalDate: {
    type: Date,
    required: true
  },
  nextContactDate: {
    type: Date,
    required: true
  },
  comment: {
    type: String
  },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  copyTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Lead = mongoose.model('lead', LeadSchema);
