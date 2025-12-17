const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
  tool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tool',
    required: true
  },

  attackType: { type: String, required: true },
  note: String,

  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    required: true
  },

  resolved: { type: Boolean, default: false },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, { timestamps: true });
module.exports = mongoose.model('Diagnostic', diagnosticSchema);
