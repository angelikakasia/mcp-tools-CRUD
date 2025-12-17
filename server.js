require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); // enables PUT/DELETE
const session = require('express-session'); // keeps user logged in
const MongoStore = require('connect-mongo').default; // stores session in MongoDB

const app = express(); // starts express app
app.set('view engine', 'ejs'); // sets EJS as view engine
app.set('port', process.env.PORT || 3333); // sets port from environment or default to 3000

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to:', process.env.MONGODB_URI);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose error:', err);
});

// Middleware
app.use(express.urlencoded({ extended: true })); // read form data
app.use(methodOverride('_method')); // enable PUT & DELETE
app.use(express.static('public')); // serve CSS, images, JS

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}));
// Make user available in all EJS views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
// GET /
app.get('/', (req, res) => {
    res.render('index.ejs')
})

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/tools', require('./routes/toolRoutes'));
app.use('/diagnostics', require('./routes/diagnosticRoutes'));

// Start server
app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});

