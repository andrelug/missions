import db from './../models/index.js';

const amperController = {};

amperController.gestaoMissoes = (req, res) => {
	res.render('dash/manage/gestaoMissoes', { user: req.user });
};

amperController.gestaoMissoesAbertas = (req, res) => {
	res.render('dash/manage/gestaoMissoesAbertas', { user: req.user });
};

amperController.gestaoMissoesNova = (req, res) => {
	res.render('dash/manage/gestaoMissoesNova', { user: req.user });
};

amperController.gestaoCategorias = (req, res) => {
	res.render('dash/manage/gestaoCategorias', { user: req.user });
};

amperController.gestaoCategoriasNova = (req, res) => {
	res.render('dash/manage/gestaoCategoriasNova', { user: req.user });
};

amperController.gestaoTarefas = (req, res) => {
	res.render('dash/manage/gestaoTarefas', { user: req.user });
};

amperController.gestaoTarefasAbertas = (req, res) => {
	res.render('dash/manage/gestaoTarefasAbertas', { user: req.user });
};

amperController.gestaoTarefasNova = (req, res) => {
	res.render('dash/manage/gestaoTarefasNova', { user: req.user });
};

amperController.gestaoBadges = (req, res) => {
	res.render('dash/manage/gestaoBadges', { user: req.user });
};

amperController.gestaoBadgesNova = (req, res) => {
	res.render('dash/manage/gestaoBadgesNova', { user: req.user });
};

amperController.gestaoEmpresas = (req, res) => {
	res.render('dash/manage/gestaoEmpresas', { user: req.user });
};

amperController.gestaoEmpresasNova = (req, res) => {
	res.render('dash/manage/gestaoEmpresasNova', { user: req.user });
};

export default amperController;
