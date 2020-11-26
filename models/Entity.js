const mongoose = require('mongoose');

const EntitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  activityType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'activityType'
  },
  contactPerson: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
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

module.exports = Entity = mongoose.model('entity', EntitySchema);
