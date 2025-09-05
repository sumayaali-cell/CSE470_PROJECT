const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  totalRating: {
    type: Number,
    default: 0,
  },
  totalRaters: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Rate', rateSchema);
