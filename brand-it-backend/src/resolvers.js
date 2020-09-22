import {
	Business as BusinessResource,
	Category as CategoryResource,
	Product
} from './models'

export const resolvers = {
	Query: {
		hello: () => 'hello',
		...BusinessResource.resolvers.Query,
		...CategoryResource.resolvers.Query,
		...Product.resolvers.Query
	},
	Mutation: {
		helloMutation: () => 'helloMutation',
		...BusinessResource.resolvers.Mutation,
		...CategoryResource.resolvers.Mutation,
		...Product.resolvers.Mutation
	}
};
