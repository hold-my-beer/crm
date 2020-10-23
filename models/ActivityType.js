const mongoose = require('mongoose');

const ActivityTypeSchema = new mongoose.Schema({
  code: {
    type: String,
    required
  },
  name: {
    type: String,
    required
  }
});

module.exports = ActivityType = mongoose.model(
  'activityType',
  ActivityTypeSchema
);
