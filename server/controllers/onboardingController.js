const onboardingController = {};

onboardingController.getUser = (req, res) => {
	res.render('onboarding/user');
};
onboardingController.getCompany = (req, res) => {
	res.render('onboarding/company');
};

export default onboardingController;
