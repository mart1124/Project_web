const { name } = require('ejs');
const fs = require('fs');
const path = require("path")
const db = require('../models');
const dbFile = db.files;
const dbhistory = db.history;


const uploadFiles = (req , res) => {
    try{
        if (req.file == undefined){
            console.log('select file')
        }
        var fullUrl = req.protocol + '://' + req.get('host') + "/api/stream/" + req.file.filename;
        console.log(req.file)
        dbFile.create({
            type: req.file.mimetype,
            name: req.file.filename,
            data: fullUrl,
            status: true
        }).then(resdata => {
            res.json({
                massage: "OK",
                statusCode: 200,
                id: resdata.id,
                name: resdata.name,
                upload_url: resdata.data
            })
        })
    } catch(error){
        console.log("ERROR:",error); 
    }
}

const  uploadConfig = async (req, res) => {
    const {id, uploadurl, helmet, not_helmet } = req.body
    console.log(uploadurl, helmet, not_helmet)

    if (!(uploadurl && helmet && not_helmet )) {
        res.status(400).json({
            message: "All input is required",
            status: 400
        })
    }
    const Filedata = await dbFile.findOne({ where: { id: id } }); //หา email ที่ตรงกันใน database
    Filedata.update({
        data: uploadurl,
        helmet_count: helmet,
        not_helmet_count: not_helmet,
    }).then( config => {
        res.status(200).json({
            massage: "Update data Succeed",
            status: "OK",
            config
            
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    });

}

const uploadImgFiles = (req , res) => {
    try{
        if (req.file == undefined){
            console.log('select file')
        }
        console.log(req.file)
        dbhistory.create({
            type: req.file.mimetype,
            name: req.file.filename,
            pic: req.file.path,
            Location: "หน้าภาควิศวคอมพิวเตอร์",
            helmet_count: "0",
            not_helmet_count: "0",
            status: true
        }).then(resdata => {
            res.json({
                massage: "OK",
                statusCode: 200,
                resdata
            })
        })
    } catch(error){
        console.log("ERROR:",error); 
    }
}


module.exports = {
    uploadFiles,
    uploadConfig,
    uploadImgFiles
}