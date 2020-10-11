import {
	Business as BusinessResource,
	Category as CategoryResource,
	Product,
	Theme,
	Logo
} from './models'

export const resolvers = {
	Query: {
		hello: () => 'hello',
		...BusinessResource.resolvers.Query,
		...CategoryResource.resolvers.Query,
		...Product.resolvers.Query,
		...Theme.resolvers.Query,
		...Logo.resolvers.Query,
	},
	Mutation: {
		helloMutation: () => 'helloMutation',
		...BusinessResource.resolvers.Mutation,
		...CategoryResource.resolvers.Mutation,
		...Product.resolvers.Mutation,
		...Theme.resolvers.Mutation,
		...Logo.resolvers.Mutation
	}
};
