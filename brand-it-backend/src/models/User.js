import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = mongoose.model(
	'User',
	{
		name: String,
		cats: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Cat'
			}
		]
	});
export default User;
