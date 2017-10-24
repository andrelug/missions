import db from './../models/index.js';

const userController = {};

userController.painel = (req, res) => {
	res.render('dash/painel', { user: req.user, page: 'painel' });
};

userController.minhasMissoes = (req, res) => {
	res.render('dash/user/minhas-missoes', { user: req.user, page: 'minhasMissoes' });
};

userController.post = (req, res) => {
	const { username, password } = req.body;

	// Validação

	const user = new db.User({
		username,
		password
	});

	user.save().then((newUser) => {
		res.status(200).json({
			success: true,
			data: newUser
		});
	}).catch((err) => {
		res.status(500).json({
			message: err
		});
	});
};

export default userController;
