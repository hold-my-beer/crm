const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  dateStart: {
    type: Date,
    required: true
  },
  dateEnd: {
    type: Date,
    required: true
  },
  renewalDate: {
    type: Date,
    required: true
  },
  premium: {
    type: Number,
    required: true
  },
  okved: {
    type: String,
    required: true
  },
  mainActivity: {
    type: String,
    required: true
  },
  referencePossible: {
    type: Boolean
  },
  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  broker: {
    type: String,
    required: true
  },
  reinsurer: {
    type: String,
    required: true
  },
  commission: {
    type: Number,
    required: true
  },
  renewalProbability: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Contract = mongoose.model('contract', ContractSchema);
