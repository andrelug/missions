import mongoose from 'mongoose';

const { Schema } = mongoose;

const missionSchema = new Schema({
	title: { type: String, required: true },
	slug: String,
	isDeleted: { type: Boolean, default: false },
	publishDate: { type: Date, default: Date.now },
	goodForDate: Date,
	deliverDate: Date,
	tags: [String],
	_company: {type: Schema.ObjectId, ref: 'Company'},
	status: String,
	_category: {type: Schema.ObjectId, ref: 'Category'},
	budget: Number,
	availability: String,
	description: String,
	applications: [{
		_user: {type: Schema.ObjectId, ref: 'User'},
		text: String,
		date: Date,
		currency: String,
		offer: Number
	}],
	_responsible: {type: Schema.ObjectId, ref: 'User'},
	reason: String,
	place: String,
	remote: Boolean,
	_toolsAccess: {type: Schema.ObjectId, ref: 'Tools'},
	graph: {
		views: Number
	},
	images: [String],
	stars: Number,
	requirements: [String],
	comments: [{
		_user: {type: Schema.ObjectId, ref: 'User'},
		comment: String,
		date: Date,
		responses: [{
			_user: {type: Schema.ObjectId, ref: 'User'},
			comment: String,
			date: Date
		}]
	}],
	itemFaq: [{
		question: String,
		answer: String
	}],
	matchDate: Date,
	matchTime: Number,
	missionProgress: [{
		status: String,
		comment: String
	}],
	_creator: { type: Schema.ObjectId, ref: 'User' }
});

// encryption here

const Mission = mongoose.model('Mission', missionSchema);
export default Mission;
