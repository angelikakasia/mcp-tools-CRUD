
const mongoose = require('mongoose');

const diagnosticSchema = new mongoose.Schema(
  {
    attackType: {
      type: String,
      required: true
    },
    note: String,
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      required: true
    },
    resolved: {
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const toolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    platform: String,
    tags: [String],
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true
    },
    diagnostics: [diagnosticSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tool', toolSchema);
