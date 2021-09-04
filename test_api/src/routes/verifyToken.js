const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../config/auth.config')

module.exports = function (req, res, next){
    console.log(req.header('auth-token'))
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({
        message: "Access Donied",
        status: 401
    });

    try{
        const verified = jwt.verify(token, TOKEN_SECRET.secret);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({
            message: "Invalid Token",
            status: 400
        });
    }
}