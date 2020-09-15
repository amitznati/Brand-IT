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
				await user.save();
				return cat;
			} else {
				throw ('user not exist');
			}
		},
		updateCat: async (_, {id, owner, name}) => {
			const cat = await Cat.findById(id).populate('owner');
			const ownerId = owner.id;
			if (cat) {
				if (ownerId !== cat.owner._id) {
					const oldUser = await User.findById(cat.owner._id);
					oldUser.cats.pull(cat);
					await oldUser.save();
					const user = await User.findById(ownerId);
					user.cats.push(cat);
					await user.save();
					cat.owner = user;
					cat.name = name;
				} else {
					cat.name = name;
				}
				await cat.save();
				return cat;
			} else {
				throw ('cat not exist');
			}
		}
	}
};
