module.exports = (req, res, next) => {
    if (req.session.user){
        //user is looged in - allow access
        return next();
    }
    //user is NOT logged in redirect to login
    res.redirect('/login');
};