const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
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
  deadlineDate: {
    type: Date,
    required: true
  },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  status: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  sentDate: {
    type: Date
  },
  quoteType: {
    type: String
  },
  renewalDate: {
    type: Date
  },
  reinsurers: [
    {
      _id: false,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reinsurer'
    }
  ],
  premium: {
    type: Number
  },
  population: {
    type: Number
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

module.exports = Opportunity = mongoose.model('opportunity', OpportunitySchema);
