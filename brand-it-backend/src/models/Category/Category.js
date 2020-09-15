import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Category = mongoose.model('Category',
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
export default Category;
