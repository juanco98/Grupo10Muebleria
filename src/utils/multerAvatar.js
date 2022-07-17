const path      = require('path');
const multer    = require("multer");

// configurando el almacenamiento
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../public/images/users')
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix  = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})

const fileUpload = multer({ 
    storage:    storage,
    fileFilter: (req, file, cb) => {
        let okExt   = ['.jpg', '.png', '.jpeg'];
        let fileExt = path.extname(file.originalname);
        let extensionIsOk = okExt.includes(fileExt);
        if (extensionIsOk) {
			cb(null, true);
		} else {
			cb(null, false);
		}
    }
});

module.exports = fileUpload;