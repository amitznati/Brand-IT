import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Theme = mongoose.model('Theme',
	{
		name: String,
		fontFamilies: {
			primary: {
				fontFamily: String,
				fontProvider: String,
				fontUrl: String
			},
			secondary: {
				fontFamily: String,
				fontProvider: String,
				fontUrl: String
			},
			tertiary: {
				fontFamily: String,
				fontProvider: String,
				fontUrl: String
			}
		},
		palette: {
			primary: String,
			secondary: String,
			tertiary: String,
		},
		images: {
			bg: String,
			frame: String,
			sideL: String,
			sideR: String,
			sideB: String,
			sideT: String
		}
	});
export default Theme;
