import {Cat as CatResource, User as UserResource} from './models'

export const resolvers = {
	Query: {
		hello: () => 'Hello world!',
		...CatResource.resolvers.Query,
		...UserResource.resolvers.Query
	},
	Mutation: {
		...CatResource.resolvers.Mutation,
		...UserResource.resolvers.Mutation
	}
};
