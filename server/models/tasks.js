import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema({
	name: String,
    description: String,
    image: String,
	slug: String,
	_responsible: {type: Schema.ObjectId, ref: "User"},
	_tools: [{type: Schema.ObjectId, ref: "Tool"}],
    _category: { type: Schema.ObjectId, ref: 'Category'},
	isDeleted: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

// encryption here

const Task = mongoose.model('Task', taskSchema);

export default Task;
