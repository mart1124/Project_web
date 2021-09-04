const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');


router.get('/upload/*',function (req, res) {
    const requrl = req.url 
    // const requrl = "1629957010589-192.168.1.50_01_20201217144329688_3.mp4"; 
    const filepath = __basedir + "/resources" + requrl ; 
    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    const range = req.headers.range;
    // console.log(range)
    if(range){
        const parts = range.replace(/bytes=/,"").split("-");
        const start = parseInt(parts[0],10);
        const end = parts[1] ? parseInt(parts[1],10) : fileSize-1;
        const chunkSize = (end - start) + 1;
        const file = fs.createReadStream(filepath, {start,end} );
        const head = {
            'Content-Range' : `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges' : 'bytes',
            'Content-Length' : chunkSize,
            'Content-Type' : 'video/mp4' 
        }
        res.writeHead(206,head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length' : fileSize,
            'Content-Type' : 'video/mp4'
        }
        res.writeHead(200,head)
        fs.createReadStream(filepath).pipe(res)
    } 
})
 


module.exports = router;