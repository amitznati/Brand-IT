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
			const product = new Product({...rest});
			const categoriesIds = input.categories;
			if (categoriesIds && categoriesIds.length) {
				console.log(categoriesIds)
				categoriesIds.forEach(id => {
					console.log(id)
					Category.findById(id).populate('products').then(cat => {
						console.log(cat);
						cat.products.push(product);
						cat.save();
					});
				});
			}
			product.imageUrl = await saveFile('product', input.name, image);
			await product.save()
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
		// deleteProduct: async (_, {id}) => {
		// 	const product = await Product.findById(id).populate('category');
		// 	if (product) {
		// 		const oldCategory = await Category.findById(product.category._id);
		// 		oldCategory.categories.pull(product);
		// 		await oldCategory.save();
		// 		await product.delete();
		// 		return product;
		// 	} else {
		// 		throw ('product not exist');
		// 	}
		// }
	}
};
