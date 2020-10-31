import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Logo = mongoose.model('Logo',
	{
		name: String,
		template: String
	});
export default Logo;
