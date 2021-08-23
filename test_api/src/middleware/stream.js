const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');


router.get('/upload/*',function (req, res) {
    const requrl = req.url; 
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
    // res.redirect('/streaming')
    // next(requrl);
})
 
// router.get('/streaming', function(req, res) {
//     const filepath = __basedir + "/resources/upload/1629622815666-bikes.mp4" ; /// มาตรงนี้เพื่อเปิด
//     const stat = fs.statSync(filepath);
//     const fileSize = stat.size;
//     const range = req.headers.range;
//     // console.log(range)
//     if(range){
//         const parts = range.replace(/bytes=/,"").split("-");
//         const start = parseInt(parts[0],10);
//         const end = parts[1] ? parseInt(parts[1],10) : fileSize-1;
//         const chunkSize = (end - start) + 1;
//         const file = fs.createReadStream(filepath, {start,end} );
//         const head = {
//             'Content-Range' : `bytes ${start}-${end}/${fileSize}`,
//             'Accept-Ranges' : 'bytes',
//             'Content-Length' : chunkSize,
//             'Content-Type' : 'video/mp4' 
//         }
//         res.writeHead(206,head);
//         file.pipe(res);
//     } else {
//         const head = {
//             'Content-Length' : fileSize,
//             'Content-Type' : 'video/mp4'
//         }
//         res.writeHead(200,head)
//         fs.createReadStream(filepath).pipe(res)
//     }
// }) 

module.exports = router;