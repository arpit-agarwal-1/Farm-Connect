const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  feedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feed',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  livestockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livestock',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
