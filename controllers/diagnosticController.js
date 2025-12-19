const Tool = require('../models/tool');



// CREATE diagnostic
const create = async (req, res) => {
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
    console.log("Tool after pushing diagnostic:", tool);
    res.redirect(`/tools/${tool._id}`);

  } catch (err) {
    console.log('Error creating diagnostic:', err);
    res.redirect('/tools');
  }
};

// EDIT FORM
const renderEdit = async (req, res) => {
  try {
    const tool = await Tool.findOne({
      _id: req.params.toolId,
      createdBy: req.session.user._id
    });

    if (!tool) return res.redirect('/tools');
    const diagnostic = tool.diagnostics.id(req.params.diagnosticId);
    console.log("Diagnostic")
    if (!tool.diagnostics.id(req.params.diagnosticId)   
    ) return res.redirect('/tools');

    res.render('diagnostics/edit', { diagnostic, tool });

  } catch (err) {
    console.log('Error loading edit form:', err);
    res.redirect('/tools');
  }
};
// render new new form
const renderNew = async (req, res) => {
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

// EDIT diagnostic
const update = async (req, res) => {
  try {
    const tool = await Tool.findOne({
      _id: req.params.toolId,
      createdBy: req.session.user._id
    });

    if (!tool) return res.redirect('/tools');

    const diagnostic = tool.diagnostics.id(req.params.diagnosticId);

    if (!diagnostic) return res.redirect('/tools');

    diagnostic.attackType = req.body.attackType;
    diagnostic.note = req.body.note;
    diagnostic.severity = req.body.severity;
    diagnostic.resolved = req.body.resolved === 'on';
    diagnostic.set(req.body);
    await tool.save();

    res.redirect(`/tools/${tool._id}`);

  } catch (err) {
    console.log('Error updating diagnostic:', err);
    res.redirect('/tools');
  }
};

// DELETE diagnostic
const deleteDiagnostic = async (req, res) => {
  try {
    const tool = await Tool.findOne({
      _id: req.params.toolId,
      createdBy: req.session.user._id
    });

    if (!tool) return res.redirect('/tools');

    const diagnostic = tool.diagnostics.id(req.params.diagnosticId);

    if (!diagnostic) return res.redirect('/tools');
    diagnostic.deleteOne();
    await tool.save();
    //

    res.redirect(`/tools/${tool._id}`);

  } catch (err) {
    console.log('Error deleting diagnostic:', err);
    res.redirect('/tools');
  }
}; 
module.exports = {
    create,
    renderEdit,
    renderNew,
    update,
    deleteDiagnostic                
};