import mongoose from 'mongoose';

const { Schema } = mongoose;

const badgeSchema = new Schema({
	name: String,
    description: String,
    image: String,
    rules: String,
	slug: String,
    _category: { type: Schema.ObjectId, ref: 'Category'},
	isDelemted: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

// encryption here

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
