import Business from './Business';
import {allModels, allModelsMeta} from '../modelsHelper';

export const resolvers = {
	Query: {
		allBusinesses: (_, input) => allModels(Business, input, 'categories'),
		_allBusinessesMeta: (_, input) => allModelsMeta(Business, input),
		Business: (_, {id}) => Business.findById(id).populate('categories')
	},
	Mutation: {
		createBusiness: async (_, {name}) => {
			return await Business.create({name});
		},
		updateBusiness: async (_, {id, name}) => {
			const business = await Business.findById(id);
			if (business) {
				business.name = name;
				await business.save();
				return business;
			} else {
				throw ('business not found');
			}
		}
	}
};
