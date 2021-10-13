const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');



router.get('/*', function(req, res) {
    const requrl = req.url
    console.log(req.url)
    const filepath = path.resolve(__basedir + "/resources/upload/img" + requrl) ;
    console.log(filepath)
    res.json(filepath)
    // fs.readFile(filepath , function(err, data) {
    //   if (err) throw err; // Fail if the file can't be read.
    //   else {
    //     res.writeHead(200, {'Content-Type': 'image/jpeg'});
    //     res.end(data); // Send the file data to the browser.
    //   }
    // });
  })


module.exports = router;;