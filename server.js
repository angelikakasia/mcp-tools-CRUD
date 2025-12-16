// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');  
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to:', process.env.MONGODB_URI);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose error:', err);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/tools', require('./routes/toolRoutes'));
app.use('/diagnostics', require('./routes/diagnosticRoutes'));

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
