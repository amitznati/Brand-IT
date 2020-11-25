import Theme from './Theme';
import {saveFile} from '../../fileManager';
import {allModels, allModelsMeta} from '../modelsHelper';

export const resolvers = {
	Query: {
		allThemes: (_, input) => allModels(Theme, input),
		_allThemesMeta: (_, input) => allModelsMeta(Theme, input),
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
