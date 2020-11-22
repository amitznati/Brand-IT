import mongoose from 'mongoose';
const UploadedImage = mongoose.model('UploadedImage',
	{
		name: String,
		url: String
	});
export default UploadedImage;
