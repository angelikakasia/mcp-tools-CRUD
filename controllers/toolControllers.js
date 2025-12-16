const Tool = require('../models/tool');

module.exports = {
  index,
  renderNew,
  create,
  show,
  renderEdit,
  update,
  delete: deleteTool
};

// GET /tools
async function index(req, res) {
  const tools = await Tool.find({ createdBy: req.session.user._id });
  res.render('tools/index', { tools });
}

// GET /tools/new
function renderNew(req, res) {
  res.render('tools/new');
}

// POST /tools
async function create(req, res) {
  req.body.createdBy = req.session.user._id;
  await Tool.create(req.body);
  res.redirect('/tools');
}

// GET /tools/:id
async function show(req, res) {
  const tool = await Tool.findById(req.params.id);
  res.render('tools/show', { tool });
}

// GET /tools/:id/edit
async function renderEdit(req, res) {
  const tool = await Tool.findById(req.params.id);
  res.render('tools/edit', { tool });
}

// PUT /tools/:id
async function update(req, res) {
  await Tool.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/tools/${req.params.id}`);
}

// DELETE /tools/:id
async function deleteTool(req, res) {
  await Tool.findByIdAndDelete(req.params.id);
  res.redirect('/tools');
}
