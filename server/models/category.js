import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
	name: String,
	slug: String,
    _parent: {type: Schema.ObjectId, ref: 'Category'},
	isDeleted: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

// encryption here

const Category = mongoose.model('Category', categorySchema);

export default Category;
