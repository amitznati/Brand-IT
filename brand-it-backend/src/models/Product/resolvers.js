import Product from './Product';
import Category from '../Category/Category';
import { createWriteStream } from 'fs';
import path from 'path';

const convertFileToBase64 = file =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;

		reader.readAsDataURL(file.rawFile);
	});

export const resolvers = {
	Query: {
		allProducts: () => Product.find().populate('categories'),
		_allProductsMeta: () => {return {count: Product.find().estimatedDocumentCount()}},
		Product: (_, {id}) => Product.findById(id).populate('categories')
	},
	Mutation: {
		createProduct: async (_, input) => {
			const {name, image} = input;
			const { filename, createReadStream } = await image.rawFile;
			const newFilename = `${name}.${filename.split('.').pop()}`;
			await new Promise(res => {
				createReadStream()
					.pipe(createWriteStream(path.join(__dirname, '/images', newFilename)))
					.on('close', res)
			})
			console.log()
			return {
				name: 'dummy',
				id: '234234234'
			}
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
