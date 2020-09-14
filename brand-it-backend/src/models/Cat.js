import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Cat = mongoose.model('Cat',
	{
		name: String,
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	});
export default Cat;
