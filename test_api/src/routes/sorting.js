const express = require('express');
const router = express.Router();
const db = require('../models');
const filterfiles = db.files;
const { Op } = require("sequelize");

// GET เอาไว้ เรียกข้อมูลไปแสดง และ ค้นหาข้อมูล
router.get('/filter', function ( req, res) {
    const startdate = req.query.startDate;
    const enddate = req.query.endDate
    console.log("เข้า get =",startdate, enddate)
    
    if(startdate && enddate){
      console.log("เข้า if =",startdate, enddate)
      filterfiles.findAll({
        attributes: ['id', 'type', 'name', 'data'],
        where: {
          createdAt: {
            [Op.between]: [startdate ,enddate]
          }
        },
    }).then(data => {
        res.status(200).json({
            data
        });
      })
      . catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
      });
    } else {
    filterfiles.findAll({
        attributes: ['id', 'type', 'name', 'data'],
    }).then(data => {
        res.status(200).json({
            data
        });
      })
      . catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
      });
    }
    
})

// POST เอาไว้ insart ข้อมูลเพิ่ม
router.post('/filter', function ( req , res) {
  const name = req.body.test;
  const datess = req.body.startdate;
  console.log(name, datess)
  if (name){
    console.log("เข้า")
    filterfiles.findAll({
        attributes: ['id', 'type', 'name', 'data'],
        where: {name: name}
    }).then(data => {
        res.status(200).json({
            data
        });
      })
      . catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
        });
  } else {
    filterfiles.findAll({
      attributes: ['id', 'type', 'name', 'data'],
      limit: 10
  }).then(data => {
      res.status(200).json({
          data
      });
    })
    . catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Error!",
          error: error
        });
      });
  }
})

module.exports = router;









// router.get('/filter', function ( req , res) {
//     const startDate = req.query.startdate
//     const test = req.query.imputdata
//     const endDate = req.query.enddate
//     // const spiltDATA = startDate.split("-")
//     // const testfilter = "video/mp4"
    
//     console.log(startDate, endDate, test)

//     filterfiles.findAll({
//         attributes: ['id', 'type', 'name', 'data', 'status'],
//         where: {type: test}
//     }).then(results => {
//         res.status(200).json({
//             message: "Succeed",
//             status: 200,
//             filterfiles: results,
//         });
//       })
//       . catch(error => {
//           console.log(error);
//           res.status(500).json({
//             message: "Error!",
//             error: error
//           });
//         });
    
// })
