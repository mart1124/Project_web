const express = require('express');
const router = express.Router();
const db = require('../models');
const filterfiles = db.files;
const { Op, Sequelize } = require("sequelize");

// GET เอาไว้ เรียกข้อมูลไปแสดง และ ค้นหาข้อมูล
router.get('/filter', function ( req, res ) {
    const {startDate, endDate, selectInput, startTime, endTime, yearData ,monthData} = req.query;
    
    console.log('test:',selectInput, startDate, endDate, startTime, endTime)
    if(selectInput){
      console.log('input : ', selectInput)
      //  ## DAY ##################################################################

      if (selectInput == 'Day' && startDate && startTime && endTime){
        let Daydate = startDate
        console.log('เข้า if Day')
        filterfiles.findAll({
          attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count'],
          where: {
            createdAt: {
              [Op.between]: [startDate ,endDate]
            },
          // order: [[Sequelize.literal("createdOn"), 'ASC']],
          // group: 'createdAt'
          },
      }).then(data => {
          filterfiles.findAll({
              attributes: [
                [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
              ],
              where: {
                createdAt: {
                  [Op.between]: [startDate ,endDate]
                },
              // order: [[Sequelize.literal("createdOn"), 'ASC']],
              // group: 'createdAt'
              },
          }).then(sumcount => {
            
              res.status(200).json({
                  data,
                  sumcount
              });
          })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
        });
      }

      //  ## Week ##################################################################

      if (selectInput == 'Week' && startDate && endDate){
        console.log('เข้า if Week')
        filterfiles.findAll({
          attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count'],
          where: {
            createdAt: {
              [Op.between]: [startDate ,endDate]
            },
          // order: [[Sequelize.literal("createdOn"), 'ASC']],
          // group: 'createdAt'
          },
      }).then(data => {
          filterfiles.findAll({
              attributes: [
                [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
              ],
              where: {
                createdAt: {
                  [Op.between]: [startDate ,endDate]
                },
              // order: [[Sequelize.literal("createdOn"), 'ASC']],
              // group: 'createdAt'
              },
          }).then(sumcount => {
            
              res.status(200).json({
                  data,
                  sumcount
              });
          })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
        });
      }
      
      //  ## Month ##################################################################

      if (selectInput == 'Month' && monthData ){
        console.log('เข้า if Month', monthData)
        
        filterfiles.findAll({
          
          attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count'],
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('Month', Sequelize.col('createdAt')), monthData),
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), monthData)
            ]
          }
      }).then(data => {
          filterfiles.findAll({
              attributes: [
                [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
              ],
              where: {
                createdAt:{
                  '$gte': monthData
                }
              }
          }).then(sumcount => {
            
              res.status(200).json({
                  data,
                  sumcount
              });
          })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
        });
      }

      //  ## Year  ##################################################################

      if (selectInput == 'Year' && yearData){

        console.log('เข้า if Year', yearData)
        filterfiles.findAll({
          attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count'],
          where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), yearData)
      }).then(data => {
          filterfiles.findAll({
              attributes: [
                [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
              ],
              where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), yearData)
          }).then(sumcount => {
            
              res.status(200).json({
                  data,
                  sumcount
              });
          })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
              message: "Error!",
              error: error
            });
        });
      }
      
    } else {
    filterfiles.findAll({
        attributes: ['id', 'type', 'name', 'data'],
    }).then(data => {
        filterfiles.findAll({
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
            [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
          ],
      }).then(sumcount => {
        
          res.status(200).json({
            data,
            sumcount
          });
      })
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
