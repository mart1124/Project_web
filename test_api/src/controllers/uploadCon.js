const fs = require('fs');
const path = require("path")
const db = require('../models');
const dbFile = db.files;

const uploadFiles = (req , res) => {
    try{
        if (req.file == undefined){
            console.log('select file')
        }
        var fullUrl = req.protocol + '://' + req.get('host') + "/api/stream/" + req.file.filename;
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
            data: fullUrl,
            status: true
        })
    } catch(error){
        console.log("ERROR:",error); 
    }
}


module.exports = {
    uploadFiles
}