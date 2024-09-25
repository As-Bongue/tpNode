const multer = require("multer");

const nosMimesTypes = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      const extension = nosMimesTypes[file.mimetype];
      console.log(extension);
      const name = file.originalname.split('.').slice(0, -1) + '_';
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 19) + "." + extension;
      cb(null, name + uniqueSuffix);
    },
  });
  
module.exports = multer({ storage: storage }).single("image");