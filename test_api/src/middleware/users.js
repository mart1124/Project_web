const jwt = require('jsonwebtoken');

/*
    Validate ข้อมูลตอนสมัคร
*/
module.exports = {
    validRegister: (req, res, next) => {
        // เช็ค username
        if (!req.query.email || req.query.email.length < 5) {
            return res.status(400).send({
                massage: "Please enter a username",
            });
        }
        // เช็ค password
        if (!req.query.password || req.query.password.length < 6) {
            return res.status(400).send({
                massage: "Please enter more than 6 passwords.",
            });
        }
        next();
    }
};