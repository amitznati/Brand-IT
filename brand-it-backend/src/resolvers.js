import {
	Business as BusinessResource,
	Category as CategoryResource
} from './models'

export const resolvers = {
	Query: {
		hello: () => 'hello',
		...BusinessResource.resolvers.Query,
		...CategoryResource.resolvers.Query
	},
	Mutation: {
		helloMutation: () => 'helloMutation',
		...BusinessResource.resolvers.Mutation,
		...CategoryResource.resolvers.Mutation
	}
};
