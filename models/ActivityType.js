const mongoose = require('mongoose');

const ActivityTypeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = ActivityType = mongoose.model(
  'activityType',
  ActivityTypeSchema,
  'activityTypes'
);
