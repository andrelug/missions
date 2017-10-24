import db from './../models/index.js';

const companyController = {};

companyController.missoes = (req, res) => {
	res.render('dash/company/missoes', { user: req.user });
};

companyController.missoesAbertas = (req, res) => {
	res.render('dash/company/missoesAbertas', { user: req.user });
};

companyController.missoesNova = (req, res) => {
	res.render('dash/company/missoesNova', { user: req.user });
};

companyController.categorias = (req, res) => {
	res.render('dash/company/categorias', { user: req.user });
};

companyController.categoriasNova = (req, res) => {
	res.render('dash/company/categoriasNova', { user: req.user });
};

companyController.tarefas = (req, res) => {
	res.render('dash/company/tarefas', { user: req.user });
};

companyController.tarefasAbertas = (req, res) => {
	res.render('dash/company/tarefasAbertas', { user: req.user });
};

companyController.tarefasNova = (req, res) => {
	res.render('dash/company/tarefasNova', { user: req.user });
};

companyController.ferramentas = (req, res) => {
	res.render('dash/company/ferramentas', { user: req.user });
};

companyController.ferramentasNova = (req, res) => {
	res.render('dash/company/ferramentasNova', { user: req.user });
};

export default companyController;
