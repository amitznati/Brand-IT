import Product from './Product';
import Category from '../Category/Category';
import {saveFile} from '../../fileManager';
import Template from '../Template/Template';

export const resolvers = {
	Query: {
		allProducts: () => Product.find(),
		_allProductsMeta: () => {return {count: Product.find().estimatedDocumentCount()}},
		Product: (_, {id}) => Product.findById(id)
	},
	Mutation: {
		createProduct: async (_, input) => {
			const {image, ...rest} = input;
			const product = await Product.create({...rest});
			const categoriesIds = input.categories;
			product.imageUrl = await saveFile('images/products', input.name, image);
			await product.save();
			if (categoriesIds && categoriesIds.length) {
				await Category.updateMany(
					{_id: {$in: categoriesIds}},
					{$push: {products: product}},
					{multi: true}
				);
			}
			console.log(product);
			return product;
		},

		// updateProduct: async (_, {id, name, category}) => {
		// 	const product = await Product.findById(id);
		// 	const categoryId = category.id;
		// 	if (product) {
		// 		if (categoryId !== product.category._id) {
		// 			const oldCategory = await Category.findById(product.category._id);
		// 			oldCategory.categories.pull(product);
		// 			await oldCategory.save();
		// 			const newCategory = await Category.findById(categoryId);
		// 			newCategory.categories.push(product);
		// 			await newCategory.save();
		// 			product.category = newCategory;
		// 			product.name = name;
		// 		} else {
		// 			product.name = name;
		// 		}
		// 		await product.save();
		// 		return product;
		// 	} else {
		// 		throw ('product not exist');
		// 	}
		// },
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
			console.log('id: ', id);
			return Product.findById(id);
		}
	}
};
