import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Font = mongoose.model('Font',
	{
		name: String,
		url: String
	});
export default Font;
