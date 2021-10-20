const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');


router.get('/*',function (req, res) {
    const requrl = req.url
    console.log(req.url)
    // const testvideofile = "1630760304549-Object-Detection-0-2021-04-09-19.45.17.mp4"; 
    const filepath = path.resolve(__basedir + "/resources/upload/" + requrl) ; 
    const stat = fs.statSync(filepath);
    const fileSize = stat.size;
    const range = req.headers.range;
    console.log(fileSize)
    console.log(range)
    if(range && range != ''){
        console.log("ส่วน 1");
        const parts = range.replace(/bytes=/,"").split("-");
        const start = parseInt(parts[0],10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunkSize = (end - start) + 1;
        // console.log(parts,start,end,chunkSize);
        const file = fs.createReadStream(filepath, {start, end} );
        const head = {
            'Content-Range' : `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges' : 'bytes',
            'Content-Length' : chunkSize,
            'Content-Type' : 'video/mp4' 
        }
        res.writeHead(206,head);
        // const file = fs.createReadStream(filepath, {start, end} )
        //     .on("open", function() {
        //         file.pipe(res);
        //     }).on("error", function(err) {
        //         res.end(err);
        //     });
        file.pipe(res);
        // console.log(head);
    } else {
        console.log("ส่วน 2");
        const head = {
            'Content-Length' : fileSize,
            'Content-Type' : 'video/mp4'
        }
        res.writeHead(200,head)
        fs.createReadStream(filepath).pipe(res)
    } 
})
 


module.exports = router;