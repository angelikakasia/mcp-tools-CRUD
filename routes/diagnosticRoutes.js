const express = require('express');
const router = express.Router();
const diagnosticController = require('../controllers/diagnosticController');
const isLoggedIn = require('../middleware/isLoggedIn');

// Protect all diagnostics routes
router.use(isLoggedIn);

// CREATE Diagnostic
router.post('/:id', diagnosticController.create);

// EDIT FORM
router.get('/:id/edit', diagnosticController.renderEdit);

// NEW FORM
router.get('/:id/new', diagnosticController.renderNew);

// UPDATE
router.put('/:id', diagnosticController.update);

// DELETE
router.delete('/:id', diagnosticController.delete);


module.exports = router;
