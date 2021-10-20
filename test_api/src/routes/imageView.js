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
  })


module.exports = router;;