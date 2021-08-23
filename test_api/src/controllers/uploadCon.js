const fs = require('fs');
const path = require("path")
const db = require('../models');
const dbFile = db.files;

const uploadFiles = (req , res) => {
    try{
        console.log(req.file);
        if (req.file == undefined){
            console.log('select file')
        }
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + "/" + req.file.filename;
        res.json({
            massage: "OK",
            statusCode: 200,
            data: {
                url: fullUrl
            }
        }),
        dbFile.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fullUrl
        })
        console.log(__basedir + "/resources/upload/" + req.file.filename)
    } catch(error){
        console.log("ERROR:",error); 
    }
}


module.exports = {
    uploadFiles
}