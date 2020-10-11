import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Logo = mongoose.model('Logo',
	{
		name: String,
		template: {
			type: Schema.Types.ObjectId,
			ref: 'Template'
		}
	});
export default Logo;
