const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images');
	},
	filename: (req, file, callback) => {
		var extension = new RegExp('(jpg|jpeg|png)');
		var testing = extension.exec(file.originalname);
		var uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		if (!testing)
			res.status(400).send('File format is not valid');
		callback(null, file.fieldname + '-' + uniqueSuffix + '.' + testing[0]);
	}
});

module.exports = multer({storage : storage}).single('image');