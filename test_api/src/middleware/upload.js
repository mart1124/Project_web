const multer = require('multer')
const path = require('path')

let fileStorageEngine =  multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __basedir + "/resources/upload/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// กำหนดลิมิต
const limits = {
    fields: 10,
    fileSize: 1980 * 1024,
    files: 1
};

let uploadFile =  multer({ storage: fileStorageEngine});

module.exports = uploadFile;