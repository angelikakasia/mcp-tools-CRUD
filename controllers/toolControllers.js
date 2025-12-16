const User = require('../models/user');

// Show ALL tools for logged-in user
exports.index = async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render('tools/index', { tools: user.tools });
};

// Show form to create a new tool
exports.new = (req, res) => {
  res.render('tools/new');
};

// Create tool
exports.create = async (req, res) => {
  const user = await User.findById(req.session.userId);

  user.tools.push({
    name: req.body.name,
    description: req.body.description,
    platform: req.body.platform,
    tags: req.body.tags.split(',').map(t => t.trim()),
    riskLevel: req.body.riskLevel
  });

  await user.save();
  res.redirect('/tools');
};

// Show a single tool + its diagnostics
exports.show = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const tool = user.tools.id(req.params.id);

  res.render('tools/show', { tool });
};

// Edit form
exports.edit = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const tool = user.tools.id(req.params.id);

  res.render('tools/edit', { tool });
};

// Update tool
exports.update = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const tool = user.tools.id(req.params.id);

  tool.name = req.body.name;
  tool.description = req.body.description;
  tool.platform = req.body.platform;
  tool.tags = req.body.tags.split(',').map(t => t.trim());
  tool.riskLevel = req.body.riskLevel;

  await user.save();
  res.redirect(`/tools/${tool._id}`);
};

// Delete tool
exports.delete = async (req, res) => {
  const user = await User.findById(req.session.userId);
  user.tools.id(req.params.id).deleteOne();
  await user.save();

  res.redirect('/tools');
};
