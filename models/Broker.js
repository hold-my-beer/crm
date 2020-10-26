const mongoose = require('mongoose');

const BrokerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employees: [
    {
      name: {
        type: String,
        required: true
      }
    }
  ],
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

module.exports = Broker = mongoose.model('broker', BrokerSchema);
