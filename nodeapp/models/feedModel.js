const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
  feedName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  pricePerUnit: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
},{timestamps:true});

module.exports = mongoose.models.Feed || mongoose.model('Feed', feedSchema);
