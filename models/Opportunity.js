const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  headquarters: {
    type: String
  },
  broker: {
    type: String,
    required: true
  },
  reinsurers: [
    {
      type: String
    }
  ],
  renewalDate: {
    type: Date
  },
  deadlineDate: {
    type: Date,
    required: true
  },
  sentDate: {
    type: Date
  },
  status: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  quoteType: {
    type: String
  },
  contactPerson: {
    type: String,
    required: true
  },
  premium: {
    type: Number
  },
  population: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Opportunity = mongoose.model('opportunity', OpportunitySchema);
