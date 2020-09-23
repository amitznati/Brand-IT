import express from 'express';
import {createWriteStream, existsSync} from "fs";
import path from "path";



export function createFilesRoutes(app) {
	const getFile = (req, res) => {
		const filePath = path.resolve(`${__dirname}/resources/images/${req.params.type}/${req.params.name}`);
		if (existsSync(filePath)) {
			res.sendFile(filePath);
		} else {
			res.send(null);
		}
	};
	const router = new express.Router();
	router.get('/:type/:name', getFile);
	app.use('/resources/images', router);
}

export async function saveFile(type, name, file) {
	const { filename, createReadStream } = await file.rawFile;
	const newFilename = `${name}.${filename.split('.').pop()}`;
	await new Promise(res => {
		createReadStream()
			.pipe(createWriteStream(path.join(__dirname, `/resources/images/${type}`, newFilename)))
			.on('close', res)
	})
	return `http://localhost:4000/resources/images/${type}/${newFilename}`;
}
