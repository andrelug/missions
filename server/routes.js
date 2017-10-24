import express from 'express';
import path from 'path';

// Controllers Imports
import basicController from './controllers/basicController';
import onboardingController from './controllers/onboardingController';
import userController from './controllers/userController';
import companyController from './controllers/companyController';
import amperController from './controllers/amperController';
import authController from './controllers/authController';

const routes = express();

// Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
function isCompany(req, res, next) {
    if (req.isAuthenticated() && req.user.accountType !== 'killer')
        return next();
    res.redirect('/painel');
}
function isAmper(req, res, next) {
    if (req.isAuthenticated() && req.user.accountType === 'amper')
        return next();
    res.redirect('/painel');
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

// Basic User routes
routes.get('/painel', isLoggedIn, userController.painel);
routes.get('/painel/minhas-missoes', isLoggedIn, userController.minhasMissoes);

// Company User routes
routes.get('/painel/missoes', isCompany, companyController.missoes);
routes.get('/painel/missoes/abertas', isCompany, companyController.missoesAbertas);
routes.get('/painel/missoes/nova', isCompany, companyController.missoesNova);
routes.get('/painel/categorias', isCompany, companyController.categorias);
routes.get('/painel/categorias/nova', isCompany, companyController.categoriasNova);
routes.get('/painel/tarefas', isCompany, companyController.tarefas);
routes.get('/painel/tarefas/abertas', isCompany, companyController.tarefas);
routes.get('/painel/tarefas/nova', isCompany, companyController.tarefasNova);
routes.get('/painel/ferramentas', isCompany, companyController.ferramentas);
routes.get('/painel/ferramentas/nova', isCompany, companyController.ferramentasNova);

// Management User routes
routes.get('/painel/gestao/missoes', isAmper, amperController.gestaoMissoes);
routes.get('/painel/gestao/missoes/abertas', isAmper, amperController.gestaoMissoesAbertas);
routes.get('/painel/gestao/missoes/nova', isAmper, amperController.gestaoMissoesNova);
routes.get('/painel/gestao/categorias', isAmper, amperController.gestaoCategorias);
routes.get('/painel/gestao/categorias/nova', isAmper, amperController.gestaoCategoriasNova);
routes.get('/painel/gestao/tarefas', isAmper, amperController.gestaoTarefas);
routes.get('/painel/gestao/tarefas/abertas', isAmper, amperController.gestaoTarefasAbertas);
routes.get('/painel/gestao/tarefas/nova', isAmper, amperController.gestaoTarefasNova);
routes.get('/painel/gestao/badges', isAmper, amperController.gestaoBadges);
routes.get('/painel/gestao/badges/nova', isAmper, amperController.gestaoBadgesNova);
routes.get('/painel/gestao/empresas', isAmper, amperController.gestaoEmpresas);
routes.get('/painel/gestao/empresas/nova', isAmper, amperController.gestaoEmpresasNova);

// Onboarding
routes.get('/onboarding-usuario', onboardingController.getUser);
routes.get('/onboarding-empresa', onboardingController.getCompany);

export default routes;
