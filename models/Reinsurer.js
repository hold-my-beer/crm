const mongoose = require('mongoose');

const ReinsurerSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Reinsurer = mongoose.model('reinsurer', ReinsurerSchema);
