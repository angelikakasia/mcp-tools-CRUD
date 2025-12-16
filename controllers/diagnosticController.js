const Tool = require('../models/tool');

module.exports = {
  create,
  renderEdit,
  update,
  delete: deleteDiagnostic
};

// POST /diagnostics
async function create(req, res) {
  const tool = await Tool.findById(req.body.toolId);
  tool.diagnostics.push({
    note: req.body.note,
    severity: req.body.severity
  });
  await tool.save();
  res.redirect(`/tools/${tool._id}`);
}

// GET /diagnostics/:id/edit
async function renderEdit(req, res) {
  const tool = await Tool.findOne({ "diagnostics._id": req.params.id });

  const diagnostic = tool.diagnostics.id(req.params.id);

  res.render('diagnostics/edit', { tool, diagnostic });
}

// PUT /diagnostics/:id
async function update(req, res) {
  const tool = await Tool.findOne({ "diagnostics._id": req.params.id });

  const diagnostic = tool.diagnostics.id(req.params.id);

  diagnostic.note = req.body.note;
  diagnostic.severity = req.body.severity;

  await tool.save();
  res.redirect(`/tools/${tool._id}`);
}

// DELETE /diagnostics/:id
async function deleteDiagnostic(req, res) {
  const tool = await Tool.findOne({ "diagnostics._id": req.params.id });
  tool.diagnostics.id(req.params.id).deleteOne();
  await tool.save();
  res.redirect(`/tools/${tool._id}`);
}
