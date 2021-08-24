const express = require('express');
const router = express.Router();
const db = require('../models');
const filterfiles = db.files;

router.get('/', function ( req , res) {
    let data = req.query.data;
    filterfiles.findAll({
        attributes: ['id', 'type', 'name', 'data'],
        // where: {data: data}
    }).then(results => {
        res.status(200).json({
            message: "Succeed",
            status: 200,
            filterfiles: results,
        });
      })
      . catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
        });
})

module.exports = router;
