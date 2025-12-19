module.exports = (req, res, next) => {
  if (req.session.user) {
    // user is logged in — allow access
    return next();
  }
  // user is NOT logged in — redirect to login
  res.redirect('/auth/login');
};
/* what i most produ off what was the most diffuclt debugging*/ 