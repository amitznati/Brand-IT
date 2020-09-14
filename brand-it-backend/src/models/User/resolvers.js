import User from './User';

export const resolvers = {
	Query: {
		allUsers: () => User.find().populate('cats'),
		_allUsersMeta: () => {return {count: User.find().estimatedDocumentCount()}},
		User: (_, {id}) => User.findById(id).populate('cats')
	},
	Mutation: {
		createUser: async (_, {name}) => {
			const user = new User({name});
			await user.save();
			return user;
		}
	}
};
