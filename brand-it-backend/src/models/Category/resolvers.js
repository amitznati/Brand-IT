import Category from './Category';
import Business from '../Business/Business';

export const resolvers = {
	Query: {
		allCategories: () => Category.find().populate('business'),
		_allCategoriesMeta: () => {return {count: Category.find().estimatedDocumentCount()}},
		Category: (_, {id}) => Category.findById(id).populate('business')
	},
	Mutation: {
		createCategory: async (_, {name, business}) => {
			const businessId = business.id;
			const businessObj = await Business.findById(businessId);
			if (businessObj) {
				const category = await Category.create({name, business: businessObj})
				businessObj.categories.push(category);
				await businessObj.save();
				return category;
			} else {
				throw ('Business not exist');
			}
		},
		updateCategory: async (_, {id, name, business}) => {
			const category = await Category.findById(id).populate('business');
			const businessId = business.id;
			if (category) {
				if (businessId !== category.business._id) {
					const oldBusiness = await Business.findById(category.business._id);
					oldBusiness.categories.pull(category);
					await oldBusiness.save();
					const newBusiness = await Business.findById(businessId);
					newBusiness.categories.push(category);
					await newBusiness.save();
					category.business = newBusiness;
					category.name = name;
				} else {
					category.name = name;
				}
				await category.save();
				return category;
			} else {
				throw ('category not exist');
			}
		}
	}
};
