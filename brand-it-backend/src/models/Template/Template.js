import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Template = mongoose.model('Template',
	{
		name: String,
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		layouts: [{
			type: String,
			layoutProperties: {type: Schema.Types.Mixed}
		}]
	});
export default Template;
