import express from 'express';
import {createWriteStream, existsSync, mkdirSync} from "fs";
import path from "path";



export function createFilesRoutes(app) {
	const getFile = (filePath ,res) => {
		if (existsSync(filePath)) {
			res.sendFile(filePath);
		} else {
			res.send(null);
		}
	}
	const getImage = (req, res) => {
		const filePath = path.resolve(`${__dirname}/resources/images/${req.params.type}/${req.params.name}`);
		getFile(filePath, res);
	};
	const getThemeFile = (req, res) => {
		const filePath = path.resolve(`${__dirname}/resources/themes/${req.params.id}/${req.params.name}`);
		getFile(filePath, res);
	};
	const router = new express.Router();
	// Themes
	router.get('/themes/:id/:name', getThemeFile);
	// Images
	router.get('/images/:type/:name', getImage);
	app.use('/resources', router);
}

export async function saveFile(path, name, file) {
	const { filename, createReadStream } = await file.rawFile;
	const newFilename = `${name}.${filename.split('.').pop()}`;
	const dir = path.join(__dirname, `/resources/${path}`)
	if (!existsSync(dir)){
		const shell = require('shelljs');
		shell.mkdir('-p', dir);
	}
	await new Promise(res => {
		createReadStream()
			.pipe(createWriteStream(dir, newFilename))
			.on('close', res)
	})
	return `http://localhost:4000/resources/${path}/${newFilename}`;
}
