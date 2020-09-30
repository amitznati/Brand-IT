import Product from './Product';
import Category from '../Category/Category';
import {saveFile} from '../../fileManager';

export const resolvers = {
	Query: {
		allProducts: () => Product.find().populate('categories'),
		_allProductsMeta: () => {return {count: Product.find().estimatedDocumentCount()}},
		Product: (_, {id}) => Product.findById(id).populate('categories')
	},
	Mutation: {
		createProduct: async (_, input) => {
			const {image, ...rest} = input;
			const product = await Product.create({...rest});
			const categoriesIds = input.categories;
			product.imageUrl = await saveFile('product', input.name, image);
			await product.save();
			if (categoriesIds && categoriesIds.length) {
				await Category.updateMany(
					{_id: {$in: categoriesIds}},
					{$push: {products: product}},
					{multi: true}
				);
			}
			return product;
		},

		// updateProduct: async (_, {id, name, category}) => {
		// 	const product = await Product.findById(id).populate('category');
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
			const product = await Product.findById(id).populate('categories');
			console.log(product);
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
		}
	}
};
