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
		updateLogo: (_, {id, ...rest}) => Logo.findByIdAndUpdate(id, {...rest})
	}
};
