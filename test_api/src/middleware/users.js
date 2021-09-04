const jwt = require('jsonwebtoken');

/*
    Validate ข้อมูลตอนสมัคร
*/
module.exports = {
    validRegister: (req, res, next) => {
        // เช็ค name
        if (!req.body.name || req.body.name.length < 1) {
            return res.status(400).send({
                massage: "Please enter a name",
            });
        }
        // เช็ค username
        if (!req.body.email || req.body.email.length < 5) {
            return res.status(400).send({
                massage: "Please enter a username",
            });
        }
        // เช็ค password
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                massage: "Please enter more than 6 passwords.",
            });
        }
        next();
    }
};