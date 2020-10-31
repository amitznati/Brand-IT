import Logo from './Logo';

export const resolvers = {
	Query: {
		allLogos: () => Logo.find(),
		_allLogosMeta: () => {return {count: Logo.find().estimatedDocumentCount()}},
		Logo: (_, {id}) => Logo.findById(id)
	},
	Mutation: {
		createLogo: async (_, {name, template}) => {
			const tobj = JSON.parse(template);
			console.log(tobj);
			console.log('tobj.layouts[0].properties: ', tobj.layouts[0].properties);

			return await Logo.create({name, template});
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
