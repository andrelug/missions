import mongoose from 'mongoose';

const { Schema } = mongoose;

const toolSchema = new Schema({
	name: String,
    description: String,
    image: String,
    rules: String,
	slug: String,
    _category: { type: Schema.ObjectId, ref: 'Category'},
    _usersWithAccess: [{ type: Schema.ObjectId, ref: 'User'}],
    values: {
        login: String,
        password: String,
        dateChanged: Date
    },
	_company: { type: Schema.ObjectId, ref: 'Company'},
	isDelemted: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

// encryption here

const Tool = mongoose.model('Tool', toolSchema);

export default Tool;
