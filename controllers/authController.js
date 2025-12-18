const User = require('../models/user');
const bcrypt = require('bcrypt');



// RENDER SIGNUP PAGE
const renderSignup = (req, res) => {
  res.render('auth/signup');
};

// SIGNUP USER
const signup = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.body.username });

    if (userExists) {
      return res.render('auth/signup', { error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword
    });

    // Save session
    req.session.user = {
      _id: newUser._id,
      username: newUser.username
    };

    res.redirect('/tools');

  } catch (err) {
    console.log('Signup error:', err);
    res.redirect('/auth/sign-up');
  }
};

// RENDER LOGIN PAGE
const renderLogin = (req, res) => {
  res.render('auth/login');
};

// LOGIN USER
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.render('auth/login', { error: "User not found" });
    }

    const matches = await bcrypt.compare(req.body.password, user.password);

    if (!matches) {
      return res.render('auth/login', { error: "Incorrect password" });
    }

    // Save session
    req.session.user = {
      _id: user._id,
      email: user.email
    };

    res.redirect('/tools');

  } catch (err) {
    console.log('Login error:', err);
    res.redirect('/login');
  }
};

// LOGOUT USER
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

module.exports = {
    renderSignup,
    signup,
    renderLogin,
    login,
    logout
};