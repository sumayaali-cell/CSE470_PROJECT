const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Chat || mongoose.model('chats', ChatSchema);
