import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		first: String,
		last: String,
		parsed: String,
		username: String
	},
	password: String,
	status: String,
	email: {
		primary: {
			type: String,
			unique: true,
			required: true
		},
		others: [String]
	},
	phone: {
		primary: String,
		others: [String]
	},
	address: {
		street: String,
		number: String,
		complemento: String,
		other: String,
		city: String,
		state: String,
		country: String,
		code: String
	},
	birthDate: Date,
	gender: String,
	bio: String,
	website: String,
	photo: String,
	coverPhoto: String,
	social: {
		facebook: {
			link: String,
			id: String,
			token: String,
			email: String,
			url: String,
			graph: Object
		},
		twitter: String,
		google: String,
		behance: String,
		dribble: String,
		github: String
	},
	arts: [String],
	_professional: {type: Schema.ObjectId, ref: 'Category'},
	hobbies: [String],
	gamification: {
		level: {
			atual: Number,
			history: Array
		},
		points: {
			atual: Number,
			history: Array
		},
		_badges: [{type: Schema.ObjectId, ref: 'Badge'}]
	},
	joinDate: Date,
	stars: [String],
	accountType: {
		type: String,
		default: 'killer'
	},
	missions: [{
		mission: {type: Schema.ObjectId, ref: 'Mission'},
		date: Date,
		value: Number,
		status: String
	}],
	finance: {
		totalDue: Number,
		totalHistory: Number,
		totalCashed: Number,
		activity: [{
			action: String,
			value: Number,
			date: Date
		}]
	},
	ownCompany: Boolean,
	_company: {type: Schema.ObjectId, ref: 'Company'},
	availability: String,
	isDeleted: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

// encryption here
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
