import Font from './Font';
import {isFontExist, saveFile} from '../../fileManager';

export const resolvers = {
	Query: {
		allFonts: () => Font.find(),
		_allFontsMeta: () => {return {count: Font.find().estimatedDocumentCount()}},
		Font: (_, {id}) => Font.findById(id)
	},
	Mutation: {
		createFont: async (_, {name, fontFile}) => {
			const font = await Font.create({name});
			const {filename} = await fontFile.rawFile;
			const fontPath = await isFontExist(filename);
			font.url = fontPath || await saveFile(`fonts`, name, fontFile);
			await font.save();
			return font;
		},
		updateFont: async (_, {id, name}) => {
			const Font = await Font.findById(id);
			if (Font) {
				Font.name = name;
				await Font.save();
				return Font;
			} else {
				throw ('Font not found');
			}
		}
	}
};
