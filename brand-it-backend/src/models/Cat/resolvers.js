import Cat from './Cat';
import User from '../User/User';

export const resolvers = {
	Query: {
		getByName: async (_,{name}) => {
			return Cat.findOne({name: name});
		},
		allCats: () => Cat.find().populate('owner'),
		_allCatsMeta: () => {return {count: Cat.find().estimatedDocumentCount()}},
		Cat: (_, {id}) => Cat.findById(id).populate('owner')
	},
	Mutation: {
		createCat: async (_, {owner, name}) => {
			const ownerId = owner.id;
			const user = await User.findById(ownerId);
			if (user) {
				const cat = await Cat.create({name, owner: user})
				user.cats.push(cat);
				user.save();
				return cat;
			} else {
				throw ('user not exist');
			}
		}
	}
};
