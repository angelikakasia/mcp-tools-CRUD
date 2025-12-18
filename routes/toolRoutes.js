const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolControllers');
const isLoggedIn = require('../middleware/isLoggedIn');

// All routes below require login
router.use(isLoggedIn);

// INDEX — show all tools
router.get('/', toolController.index);

// NEW — show form
router.get('/new', toolController.renderNew);

// CREATE
router.post('/', toolController.create);

// SHOW — one tool
router.get('/:id', toolController.show);

// EDIT FORM
router.get('/:id/edit', toolController.renderEdit);

// UPDATE
router.put('/:id', toolController.update);

// DELETE
router.delete('/:id', toolController.deleteTool);

module.exports = router;
