import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Business = mongoose.model('Business',
	{
		name: String,
		categories: [{
			type: Schema.Types.ObjectId,
			ref: 'BusinessCategory'
		}]
	});
export default Business;
