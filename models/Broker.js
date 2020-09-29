const mongoose = require('mongoose');

const BrokerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employees: [
    {
      firstName: {
        type: String,
        required: true
      },
      secondName: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Broker = mongoose.model('broker', BrokerSchema);
