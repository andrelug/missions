import passport from './../config/passport';

const authController = {};

authController.local = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/registro'
});

authController.login = passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/registro'
});

authController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

authController.authFacebook = passport.authenticate('facebook', {
    scope : ['email', 'user_friends']
});

authController.authFacebookCallback = passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/registro'
});

export default authController;
