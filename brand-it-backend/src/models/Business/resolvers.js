import Business from './Business';

export const resolvers = {
	Query: {
		allBusinesses: () => Business.find().populate('categories'),
		_allBusinessesMeta: () => {return {count: Business.find().estimatedDocumentCount()}},
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
