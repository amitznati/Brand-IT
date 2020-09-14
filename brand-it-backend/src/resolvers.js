import Cat from './models/Cat';
import User from './models/User';

export const resolvers = {
	Query: {
		hello: () => 'Hello world!',
		getByName: async (_,{name}) => {
			return Cat.findOne({name: name});
		},
		allCats: () => Cat.find().populate('owner'),
		_allCatsMeta: () => {return {count: Cat.find().estimatedDocumentCount()}},
		allUsers: () => User.find().populate('cats'),
		_allUsersMeta: () => {return {count: User.find().estimatedDocumentCount()}},
		Cat: (_, {id}) => Cat.findById(id).populate('owner'),
		User: (_, {id}) => User.findById(id).populate('cats')
	},
	Mutation: {
		createUser: async (_, {name}) => {
			const user = new User({name});
			await user.save();
			return user;
		},
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
