const path      = require('path');
const multer    = require("multer");

// configurando el almacenamiento
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../public/images/products')
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
})
let fileUpload = multer({ storage });

const multipleImgProd = fileUpload.fields([{ name: 'productImg', maxCount: 1 }, { name: 'productImages', maxCount: 8 }])

module.exports = multipleImgProd;