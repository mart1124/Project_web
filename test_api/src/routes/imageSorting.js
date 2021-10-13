const express = require('express');
const router = express.Router();
const db = require('../models');
const historyImage = db.history;
const { Op, Sequelize } = require("sequelize");

// GET เอาไว้ เรียกข้อมูลไปแสดง และ ค้นหาข้อมูล
router.get('/getImage', function ( req, res ) {
    const {startDate, endDate, selectInput, startTime, endTime, yearData ,monthData} = req.query;
    
    if(selectInput){
        console.log('input : ', selectInput)
      
      //  ## DAY ##################################################################

        if (selectInput == 'Day' && startDate && endDate){
            
            console.log('เข้า if Day', startDate ,endDate)
            historyImage.findAll({
                attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count'],
                where: {
                    createdAt: {
                        [Op.between]: [startDate ,endDate]
                    },
                // order: [[Sequelize.literal("createdOn"), 'ASC']],
                // group: 'createdAt'
            },
        }).then(data => {
            historyImage.findAll({
                attributes: [
                    [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                    [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
                ],
                where: {
                    createdAt: {
                    [Op.between]: [startDate ,endDate]
                    },
                
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
            historyImage.findAll({
                attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count'],
                where: {
                    [Op.and]: {
                        createdAt: {
                            [Op.between]: [startDate ,endDate],
                        },
                        status: 1
                    }
                },
        }).then(data => {
                historyImage.findAll({
                    attributes: [
                        [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                        [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
                    ],
                    where: {
                        [Op.and]: {
                            createdAt: {
                                [Op.between]: [startDate ,endDate],
                            },
                            status: 1
                        }
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
            
            var dateObj = new Date(monthData);
            var startMonth = dateObj.getFullYear() + "-" +(('0'+(dateObj.getMonth()+1)).slice(-2)) +"-"+ '01'
            var endMonth = dateObj.getFullYear()+ "-"+(('0'+((dateObj.getMonth()+1)%12 + 1)).slice(-2))+ "-" + '01'
            console.log('dateObj 2ss:', startMonth,endMonth)
            historyImage.findAll({
            
            attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count'],
            where: {
                createdAt: {
                    [Op.between]: [startMonth ,endMonth]
                },
            }
            
        }).then(data => {
            historyImage.findAll({
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
            historyImage.findAll({
                attributes: ['id', 'type', 'name', 'data', 'helmet_count', 'not_helmet_count'],
                where:{ 
                    [Op.and]:[ 
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), yearData)],
                        status: 1  
                },

            })
            .then(data => {
                historyImage.findAll({
                    attributes: [
                        [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                        [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
                    ],
                    where:{
                        [Op.and]:
                            [Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), yearData)],
                            status: 1  
                    }
                }).then(sumcount => {
                    
                    res.status(200).json({
                        data,
                        sumcount
                    });
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                    message: "Error!",
                    error: error
                    });
                });
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
            historyImage.findAll({
                attributes: ['id', 'type', 'name', 'data'],
                where:{
                status: 1  
                },
            }).then(data => {
                historyImage.findAll({
                    attributes: [
                        [Sequelize.fn('SUM', Sequelize.col('helmet_count')), 'helmet_count'],
                        [Sequelize.fn('SUM', Sequelize.col('not_helmet_count')), 'not_helmet_count'],
                    ],
                    where:{
                        status: 1  
                    },
                }).then(sumcount => {
                    
                    res.status(200).json({
                        data,
                        sumcount
                    });
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        message: "Error!",
                        error: error
                    });
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "Error!",
                    error: error
                });
            });
        }
    
})



module.exports = router;







