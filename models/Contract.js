const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'company'
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'entity'
  },
  premium: {
    type: Number,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  nextRenewalDate: {
    type: Date,
    required: true
  },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  reinsurers: [
    {
      _id: false,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reinsurer'
    }
  ],
  broker: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'broker'
  },
  brokerEmployee: {
    type: String,
    required: true
  },
  population: {
    type: Number,
    required: true
  },
  isRenewal: {
    type: Boolean,
    required: true
  },
  commission: {
    type: Number,
    required: true
  },
  renewalProbability: {
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

module.exports = Contract = mongoose.model('contract', ContractSchema);
