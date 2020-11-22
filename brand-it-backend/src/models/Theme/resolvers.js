import Theme from './Theme';
import {isFontExist, saveFile} from '../../fileManager';

export const resolvers = {
	Query: {
		allThemes: () => Theme.find(),
		_allThemesMeta: () => {return {count: Theme.find().estimatedDocumentCount()}},
		Theme: (_, {id}) => Theme.findById(id)
	},
	Mutation: {
		createTheme: async (_, {images, ...rest}) => {
			try {
				// const {name, images, fontFamilies, palette} = input;
				const theme = await Theme.create({images: {}, ...rest });
				await Promise.all(['bg', 'frame', 'sideL', 'sideR', 'sideB', 'sideT'].map(async (imageName) => {
					if (images[imageName]) {
						console.log('saving image: ', images[imageName]);
						theme.images[imageName] = await saveFile(`themes/${theme.id}`, imageName, images[imageName]);
					}
				}));
				// await Promise.all(['primary', 'secondary', 'tertiary'].map(async (fontType) => {
				// 	if (fontFamilies[fontType]) {
				// 		const {filename} = await fontFamilies[fontType].rawFile;
				// 		const fontPath = await isFontExist(filename);
				// 		if (fontPath) {
				// 			theme.fontFamilies[fontType] = fontPath;
				// 		} else {
				// 			theme.fontFamilies[fontType] = await saveFile('fonts', undefined, fontFamilies[fontType]);
				// 		}
				// 	}
				// }));
				await theme.save();
				return theme;
			} catch (error) {
				console.log('error: ', error);
				throw error;
			}
		},
		deleteTheme: async (_, {id}) => {
			await Theme.findByIdAndDelete(id);
			return 'Theme Deleted';
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
