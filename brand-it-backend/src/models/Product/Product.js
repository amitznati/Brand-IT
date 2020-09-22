import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Product = mongoose.model('Product',
	{
		name: String,
		imageUrl: String,
		size: {
			height: Number,
			width: Number
		},
		templateFrame: {
			x: Number,
			y: Number,
			height: Number,
			width: Number
		},
		categories: [{
			type: Schema.Types.ObjectId,
			ref: 'Category'
		}],
		templates: [{
			type: Schema.Types.ObjectId,
			ref: 'Template'
		}],
	});
export default Product;
