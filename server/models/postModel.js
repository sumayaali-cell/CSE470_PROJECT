const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['lost', 'found'], required: true },
  description: { type: String },
  date: { type: Date },
  imageUrl: { type: String },
  user: { type: String, required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  claimed: { type: Boolean, default: false }, 
  isResolved: { type: Boolean, default: false }, 
}, { timestamps: true });

module.exports = mongoose.models.Report || mongoose.model('items', postSchema);

