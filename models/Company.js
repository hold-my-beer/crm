const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // entities: [
  //   {
  //     name: {
  //       type: String,
  //       required: true
  //     },
  //     activityType: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //       ref: 'activityType'
  //     }
  //   }
  // ],
  rightToMention: {
    type: String
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

module.exports = Company = mongoose.model('company', CompanySchema);
