const Tool = require('../models/tool');
const Diagnostic = require('../models/diagnostic'); // tools and diagnostics are related



// INDEX – show all tools that belong to logged-in user

const index = async (req, res) => {
  try {
    const tools = await Tool.find({ createdBy: req.session.user._id });

    res.render('tools/index', { tools });

  } catch (err) {
    console.log('Error loading tools index:', err);
    res.redirect('/');
  }
};


// NEW – render form to create a new tool

const renderNew = (req, res) => {
  res.render('tools/new');
};



// CREATE – add new tool for logged-in user

const create = async (req, res) => {
  try {
    const tagsArray = req.body.tags
      ? req.body.tags.split(',').map(tag => tag.trim())
      : [];

    await Tool.create({
      name: req.body.name,
      platform: req.body.platform,
      riskLevel: req.body.riskLevel,
      description: req.body.description,
      tags: tagsArray,
      createdBy: req.session.user._id   // referencing the user
    });

    res.redirect('/tools');

  } catch (err) {
    console.log('Error creating tool:', err);
    res.redirect('/tools');
  }
};


// SHOW – display one tool + its diagnostics

const show = async (req, res) => {
  try {
    // Find tool only if it belongs to the logged-in user
    const tool = await Tool.findOne({
      _id: req.params.id,
      createdBy: req.session.user._id
    });

    if (!tool) return res.redirect('/tools');

    // Load diagnostics referencing this tool
    const diagnostics = await Diagnostic.find({ tool: tool._id });

    res.render('tools/show', { tool, diagnostics });

  } catch (err) {
    console.log('Error showing tool:', err);
    res.redirect('/tools');
  }
};



// EDIT – show edit form for a tool

const renderEdit = async (req, res) => {
  try {
    const tool = await Tool.findOne({
      _id: req.params.id,
      createdBy: req.session.user._id
    });

    if (!tool) return res.redirect('/tools');

    res.render('tools/edit', { tool });

  } catch (err) {
    console.log('Error loading edit form:', err);
    res.redirect('/tools');
  }
};



// UPDATE – update an existing tool

const update = async (req, res) => {
  try {
    const tool = await Tool.findOne({
      _id: req.params.id,
      createdBy: req.session.user._id
    });

    if (!tool) return res.redirect('/tools');

    tool.name = req.body.name;
    tool.platform = req.body.platform;
    tool.riskLevel = req.body.riskLevel;
    tool.description = req.body.description;
    tool.tags = req.body.tags
      ? req.body.tags.split(',').map(tag => tag.trim())
      : [];

    await tool.save();

    res.redirect(`/tools/${tool._id}`);

  } catch (err) {
    console.log('Error updating tool:', err);
    res.redirect('/tools');
  }
};


// DELETE – remove tool + all diagnostics linked to it

const deleteTool = async (req, res) => {
  try {
    const toolId = req.params.id;

    // Ensure user owns this tool
    await Tool.deleteOne({
      _id: toolId,
      createdBy: req.session.user._id
    });

    //  remove diagnostics related to this tool
    await Diagnostic.deleteMany({ tool: toolId });

    res.redirect('/tools');

  } catch (err) {
    console.log('Error deleting tool:', err);
    res.redirect('/tools');
  }
};
module.exports = {
    index,
    renderNew,
    create,
    show,
    renderEdit,
    update,
    deleteTool                
};