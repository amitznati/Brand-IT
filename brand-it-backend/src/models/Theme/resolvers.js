import Theme from './Theme';
import {isFontExist, saveFile} from '../../fileManager';

export const resolvers = {
	Query: {
		allThemes: () => Theme.find(),
		_allThemesMeta: () => {return {count: Theme.find().estimatedDocumentCount()}},
		Theme: (_, {id}) => Theme.findById(id)
	},
	Mutation: {
		createTheme: async (_, input) => {
			try {
				console.log(input);
				const {name, images, fontFamilies, palette} = input;
				const theme = await Theme.create({name, palette, images: {}, fontFamilies: {}});
				await Promise.all(['bg', 'frame', 'sideL', 'sideR', 'sideB', 'sideT'].map(async (imageName) => {
					if (images[imageName]) {
						console.log('saving image: ', images[imageName]);
						theme.images[imageName] = await saveFile(`themes/${theme.id}`, imageName, images[imageName]);
					}
				}));
				console.log('after images: ', theme);
				await Promise.all(['primary', 'secondary', 'tertiary'].map(async (fontName) => {
					if (fontFamilies[fontName]) {
						const {filename} = await fontFamilies[fontName].rawFile;
						const fontPath = await isFontExist(filename);
						if (fontPath) {
							theme.fontFamilies[fontName] = fontPath;
						} else {
							theme.fontFamilies[fontName] = await saveFile('fonts', filename, fontFamilies[fontName]);
						}
					}
				}));
				console.log('after fonts: ', theme);
				await theme.save();
				return theme;
			} catch (error) {
				console.log('error: ', error);
				throw error;
			}
		},
		updateTheme: async (_, {id, name}) => {
			const theme = await Theme.findById(id);
			if (theme) {
				theme.name = name;
				await theme.save();
				return theme;
			} else {
				throw ('theme not found');
			}
		}
	}
};
