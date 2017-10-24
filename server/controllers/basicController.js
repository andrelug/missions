const basicController = {};

basicController.getHome = (req, res) => {
	if(req.user) {
		res.render('index', {user: req.user});
	} else {
		res.render('index');
	}

};
basicController.getAbout = (req, res) => {
	res.render('sobre');
};
basicController.getContact = (req, res) => {
	res.render('contato');
};
basicController.getLogin = (req, res) => {
	res.render('login');
};
basicController.getRegister = (req, res) => {
	res.render('registro');
};

export default basicController;
