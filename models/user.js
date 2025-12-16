const mongoose = require('mongoose');


// Diagnostic Schema
const diagnosticSchema = new mongoose.Schema({
  attackVector: { type: String, required: true },      // e.g., "Tool Poisoning"
  severity: { type: String },                          // "High", "Medium", etc.
  notes: { type: String },
  resolved: { type: Boolean, default: false }          // stretch goal toggle
}, { timestamps: true });


// MCP Tool Schema
const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },              // e.g., "filesystem-read-file"
  description: { type: String, required: true },
  platform: { type: String, required: true },          // e.g., "Cursor"
  tags: [String],                                       // ["filesystem", "read"]
  riskLevel: { type: String, required: true },          // Low/Medium/High
  diagnostics: [diagnosticSchema]                       // embedded diagnostics
}, { timestamps: true });


// User Schema

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // EMBEDDED MCP Tools inside the user
  tools: [toolSchema]
});

// Export the model so controllers can use it
module.exports = mongoose.model('User', userSchema);
