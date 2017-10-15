import passport from './../config/passport';

const authController = {};

authController.local = passport.authenticate('local-signup', {
    successRedirect : '/painel',
    failureRedirect : '/registro'
});

authController.login = passport.authenticate('local-login', {
    successRedirect : '/painel',
    failureRedirect : '/registro'
});

authController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

authController.authFacebook = passport.authenticate('facebook', {
    scope : ['user_friends']
});

authController.authFacebookCallback = passport.authenticate('facebook', {
    successRedirect : '/painel',
    failureRedirect : '/registro'
});

export default authController;
