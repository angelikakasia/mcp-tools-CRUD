const User = require('../models/user');

// Show form to create a diagnostic for a tool
exports.new = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const tool = user.tools.id(req.params.toolId);

  res.render('diagnostics/new', { tool });
};

// Create diagnostic
exports.create = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const tool = user.tools.id(req.params.toolId);

  tool.diagnostics.push({
    severity: req.body.severity,
    note: req.body.note
  });

  await user.save();
  res.redirect(`/tools/${tool._id}`);
};

// Edit form
exports.edit = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const tool = user.tools.id(req.params.toolId);
  const diagnostic = tool.diagnostics.id(req.params.diagnosticId);

  res.render('diagnostics/edit', { tool, diagnostic });
};

// Update diagnostic
exports.update = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const tool = user.tools.id(req.params.toolId);
  const diagnostic = tool.diagnostics.id(req.params.diagnosticId);

  diagnostic.severity = req.body.severity;
  diagnostic.note = req.body.note;

  await user.save();
  res.redirect(`/tools/${tool._id}`);
};

// Delete diagnostic
exports.delete = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const tool = user.tools.id(req.params.toolId);

  tool.diagnostics.id(req.params.diagnosticId).deleteOne();

  await user.save();
  res.redirect(`/tools/${tool._id}`);
};
