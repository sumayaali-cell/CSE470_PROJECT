const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "items",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reports", reportSchema);

