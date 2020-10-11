import Logo from './Logo';

export const resolvers = {
	Query: {
		allLogos: () => Logo.find().populate('template'),
		_allLogosMeta: () => {return {count: Logo.find().estimatedDocumentCount()}},
		Logo: (_, {id}) => Logo.findById(id).populate('template')
	},
	Mutation: {
		createLogo: async (_, {name, template}) => {
			return {id: 'sdffsf123123', name, template}
		},
		updateLogo: async (_, {id, name}) => {
			const Logo = await Logo.findById(id);
			if (Logo) {
				Logo.name = name;
				await Logo.save();
				return Logo;
			} else {
				throw ('Logo not found');
			}
		}
	}
};
