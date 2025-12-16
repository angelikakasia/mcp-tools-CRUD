// controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');


// RENDER SIGNUP PAGE
exports.renderSignup = (req, res) => {
  res.render('auth/signup');
};


// SIGNUP LOGIC
exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.send('Username already exists.');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create new user
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword
    });

    // store user in session (log them in)
    req.session.user = {
      id: newUser._id,
      username: newUser.username
    };

    res.redirect('/tools'); // go to main app area
  } catch (error) {
    console.log(error);
    res.send('Error during signup.');
  }
};


// RENDER LOGIN PAGE
exports.renderLogin = (req, res) => {
  res.render('auth/login');
};


// LOGIN LOGIC
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    // user does not exist
    if (!user) {
      return res.send('Invalid username or password.');
    }

    // compare passwords
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.send('Invalid username or password.');
    }

    // save user session
    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.redirect('/tools');
  } catch (error) {
    console.log(error);
    res.send('Error during login.');
  }
};


// LOGOUT
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
