
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
    diagnostics: [diagnosticSchema], //embedded diagnostics -this is not a model is just a schema
    //full model you have to go through model to get to the embeded schema
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tool', toolSchema);
//referencing 2 diff. models referencing each other they can exists independently
