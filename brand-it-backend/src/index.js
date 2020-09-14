import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';

const startServer = async () => {
	const server = new ApolloServer({	typeDefs, resolvers	});

	const app = express();

	server.applyMiddleware({ app });

	await mongoose.connect('mongodb://localhost:27017/brand-it', {useNewUrlParser: true, useUnifiedTopology: true});

	app.listen({ port: 4000 }, () =>
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
	);
};

startServer();
