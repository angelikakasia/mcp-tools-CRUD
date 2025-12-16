const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema({
  note: String,
  severity: String
});

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  platform: String,
  tags: [String],
  riskLevel: String,
  diagnostics: [diagnosticSchema], // embedded diagnostics
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Tool', toolSchema);
