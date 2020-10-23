const mongoose = require('mongoose');

const ReinsurerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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

module.exports = Reinsurer = mongoose.model('reinsurer', ReinsurerSchema);
