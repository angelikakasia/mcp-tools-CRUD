// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Show signup form
router.get('/signup', authController.renderSignup);

// Handle signup form
router.post('/signup', authController.signup);

// Show login form
router.get('/login', authController.renderLogin);

// Handle login form
router.post('/login', authController.login);

// Logout user
router.get('/logout', authController.logout);

module.exports = router;
