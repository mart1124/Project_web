const express = require('express');
const router = express.Router();
const uploadCon = require('../controllers/uploadCon');
const upload = require('../middleware/upload');


let routes = (app) => {
    router.post("/upload", upload.single('file'),uploadCon.uploadFiles);
}

module.exports = routes;