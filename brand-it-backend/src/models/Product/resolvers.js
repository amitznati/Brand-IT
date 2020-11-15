import Product from './Product';
import Category from '../Category/Category';
import {saveFile} from '../../fileManager';
import Template from '../Template/Template';

async function updateProductImageAndCategories(rest, image, product) {
	const categoriesIds = rest.categories;
	if (image) {
		product.imageUrl = await saveFile('images/products', rest.name, image);
		await product.save();
	}
	if (categoriesIds && categoriesIds.length) {
		await Category.updateMany(
			{_id: {$in: categoriesIds}},
			{$push: {products: product}},
			{multi: true}
		);
	}
	return product;
}

export const resolvers = {
	Query: {
		allProducts: () => Product.find(),
		_allProductsMeta: () => {return {count: Product.find().estimatedDocumentCount()}},
		Product: (_, {id}) => Product.findById(id),
		getProductWithTemplates: (_, {productId}) => Product.findById(productId).populate('templates'),
		getProductsWithTemplates: (_, {params}) => {
			const {categories = [], ids = []} = params;
			const payload = {};
			if (categories.length) {
				payload.categories = {$in: categories};
			}
			if (ids.length) {
				payload['_id'] = {$in: ids};
			}
			return Product.find(payload).populate('templates');
		}
	},
	Mutation: {
		createProduct: async (_, input) => {
			const {image, ...rest} = input;
			const product = await Product.create({...rest});
			const categoriesIds = input.categories;
			return await updateProductImageAndCategories(rest, image, product);
		},

		updateProduct: async (_, {id, image, ...rest}) => {
			const product = await Product.findById(id);
			if (product) {
				await Category.updateMany(
					{},
					{$pull: {products: id}},
					{multi: true}
				);
				await Product.findByIdAndUpdate(id, rest);
				return await updateProductImageAndCategories(rest, image, product);
			} else {
				throw ('product not exist');
			}
		},
		deleteProduct: async (_, {id}) => {
			const product = await Product.findById(id);
			if (product) {
				await Category.updateMany(
					{},
					{$pull: {products: id}},
					{multi: true}
				);
				await product.delete();
				return product;
			} else {
				throw ('product not exist');
			}
		},
		addTemplate: async (_, {id, template}) => {
			const newTemplate = await Template.create({template});
			await Product.findByIdAndUpdate(id, {
				$push: {templates: newTemplate},
			});
			console.log(template);
			return Product.findById(id);
		}
	}
};
