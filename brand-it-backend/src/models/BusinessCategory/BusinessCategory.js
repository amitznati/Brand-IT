import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const BusinessCategory = mongoose.model('BusinessCategory',
	{
		name: String,
		business: {
			type: Schema.Types.ObjectId,
			ref: 'Business'
		},
		products: [{
			type: Schema.Types.ObjectId,
			ref: 'Product'
		}]
	});
export default BusinessCategory;
