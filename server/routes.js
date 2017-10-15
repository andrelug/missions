import express from 'express';
import path from 'path';

// Controllers Imports
import basicController from './controllers/basicController';
import onboardingController from './controllers/onboardingController';
import userController from './controllers/userController';
import authController from './controllers/authController';

const routes = express();

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

// Main pages
routes.get('/', basicController.getHome);
routes.get('/sobre', basicController.getAbout);
routes.get('/contato', basicController.getContact);
routes.get('/login', basicController.getLogin);
routes.get('/registro', basicController.getRegister);

// Auth
routes.post('/signup', authController.local);
routes.post('/login', authController.login);
routes.get('/logout', authController.logout);
routes.get('/auth/facebook', authController.authFacebook);
routes.get('/auth/facebook/callback', authController.authFacebookCallback);

// User routes
routes.get('/painel', isLoggedIn, userController.painel);

// Onboarding
routes.get('/onboarding-usuario', onboardingController.getUser);
routes.get('/onboarding-empresa', onboardingController.getCompany);

// User routes

export default routes;
