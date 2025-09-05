const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: "" },
}, { _id: true }); // ensure each question has a unique _id

const verificationSchema = new mongoose.Schema({
  reportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reports",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("verifications", verificationSchema);
