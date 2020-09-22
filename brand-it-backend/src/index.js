import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';


const startServer = async () => {
	const server = new ApolloServer({	typeDefs, resolvers	});

	const app = express();
	const router = new express.Router();
	const getFile = function (req, res) {
		const path = require('path');
		const fs = require('fs');
		const filePath = path.resolve(`${__dirname}/models/Product/images/${req.params.name}`);
		if (fs.existsSync(filePath)) {
			res.sendFile(filePath);
		} else {
			res.send(null);
		}
	};
	router.get('/:name', getFile);
	app.use('/product', router);
	server.applyMiddleware({ app });

	await mongoose.connect('mongodb://localhost:27017/brand-it', {useNewUrlParser: true, useUnifiedTopology: true});

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

	});

};

startServer();
