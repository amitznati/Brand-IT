import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Theme = mongoose.model('Theme',
	{
		name: String,
		fontFamilies: {
			primary: String,
			secondary: String,
			tertiary: String
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
