const Diagnostic = require('../models/diagnostic');
const Tool = require('../models/tool');

// CREATE diagnostic
exports.create = async (req, res) => {
  try {
    const tool = await Tool.findOne({
      _id: req.params.id,
      createdBy: req.session.user._id
    });

    if (!tool) return res.redirect('/tools');

     tool.diagnostics.push({
      attackType: req.body.attackType,
      note: req.body.note,
      severity: req.body.severity,
      resolved: false,
      createdBy: req.session.user._id
    });

    await tool.save();

    res.redirect(`/tools/${tool._id}`);

  } catch (err) {
    console.log('Error creating diagnostic:', err);
    res.redirect('/tools');
  }
};

// EDIT FORM
exports.renderEdit = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findOne({
      _id: req.params.diagnosticId,
      createdBy: req.session.user._id
    }).populate('tool');

    if (!diagnostic) return res.redirect('/tools');

    res.render('diagnostics/edit', { diagnostic, tool: diagnostic.tool });

  } catch (err) {
    console.log('Error loading edit form:', err);
    res.redirect('/tools');
  }
};
// render new new form
exports.renderNew = async (req, res) => {
  try {
    const tool = await Tool.findOne({
      _id: req.params.id,
      createdBy: req.session.user._id
    });

    if (!tool) return res.redirect('/tools');

    res.render('diagnostics/new', { tool });

  } catch (err) {
    console.log('Error loading new form:', err);
    res.redirect('/tools');
  }
};

// UPDATE diagnostic
exports.update = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findOne({
      _id: req.params.diagnosticId,
      createdBy: req.session.user._id
    });

    if (!diagnostic) return res.redirect('/tools');

    diagnostic.attackType = req.body.attackType;
    diagnostic.note = req.body.note;
    diagnostic.severity = req.body.severity;
    diagnostic.resolved = req.body.resolved === 'on';

    await diagnostic.save();

    res.redirect(`/tools/${diagnostic.tool}`);

  } catch (err) {
    console.log('Error updating diagnostic:', err);
    res.redirect('/tools');
  }
};

// DELETE diagnostic
exports.delete = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findOne({
      _id: req.params.diagnosticId,
      createdBy: req.session.user._id
    });

    if (!diagnostic) return res.redirect('/tools');

    const toolId = diagnostic.tool;

    await Diagnostic.deleteOne({ _id: diagnostic._id });

    res.redirect(`/tools/${toolId}`);

  } catch (err) {
    console.log('Error deleting diagnostic:', err);
    res.redirect('/tools');
  }
};
