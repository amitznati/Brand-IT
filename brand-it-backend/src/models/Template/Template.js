import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Template = mongoose.model('Template',
	{
		name: String,
		products: [{
			type: Schema.Types.ObjectId,
			ref: 'Product'
		}],
		layouts: [{
			type: String,
			layoutProperties: Object
		}]
	});
export default Template;
