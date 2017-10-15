import mongoose from 'mongoose';

const { Schema } = mongoose;

const companySchema = new Schema({
	name: String,
    email: String,
    slug: String,
    phone: String,
    address: {
        street: String,
		number: String,
		other: String,
		city: String,
		state: String,
		country: String,
		code: String
    },
    bio: String,
    website: String,
    photo: String,
    coverPhoto: String,
    social: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        other: [Array]
    },
    _missions: [{type: Schema.ObjectId, ref: 'Mission'}],
	isDeleted: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

// encryption here

const Company = mongoose.model('Company', companySchema);

export default Company;
