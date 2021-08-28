const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const TOKEN_SECRET = require('../config/auth.config')
const user = db.users;
const auth = db.auth;

const usersMiddleware = require('../middleware/users')

/* 
    ======== User Register ======== 
*/
router.post('/register',usersMiddleware.validRegister,  async (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const password = req.query.password;
    
    if (!(name && email && password)) {
        res.status(400).json({
            message: "All input is required",
            status: 400
        })
      }
    // เช็คว่าตัว email มี ข้อมูลอยู่ใน database แล้ว
    const oldUser = await user.findOne({ 
        where: {
            email: email
        }
     });
  
    if (oldUser) {
        return res.status(409).json({
            message: "User Already Exist. Please Login",
            status: 409
        })
    };
    // hashCode (เข้ารหัสข้อมูล)
    const salt = await bcrypt.genSalt(10)
    const hashcode = await bcrypt.hash((email + password), salt)
    const hashedPassword = await bcrypt.hash(password, salt)

    // สร้างข้อมูล ใน TB user
    user.create({
        name: name,
        email: email.toLowerCase(),
        password: hashedPassword,
        permission: 1,
        idUser: hashcode
    }).then(user => {
        res.status(200).json({
            message: "Users Register Succeed",
            status: 200,
            data: {
                id: user.id,
                name: user.name,
                email: user.email 
            },
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error!",
            error: error
        });
    });

    auth.create({
        idUser: hashcode
    });
});


/* 
    ======== User Login ======== 
*/
router.post('/login', async (req, res) => {
    const email = req.query.email;
    const epass = req.query.email + req.query.password

    const emailcheck = await user.findOne({ where: { email: email } }); //หา email ที่ตรงกันใน database
    if (!emailcheck) {
        return res.status(400).json({
            message: "Email or password is worng",
            status: 400
        });
    }

    const valididUser = await bcrypt.compare(epass, emailcheck.idUser) //เปรียบเทียบ ค่า ที่ได้จากการ login กับ idUser
    if (!valididUser) {
        return res.status(400).json({
            message: "invalid email or password",
            status: 400
        });
    }
       
    const token = jwt.sign({ idUser: emailcheck.idUser}, TOKEN_SECRET.secret, {expiresIn: "1d"}); // นำ idUser มา gen jwt Token
    res.header('auth-token', token) //เอา Token ที่ได้มาเก็บไว้ใน header 
    return res.status(200).json({
        message: "Login Success",
        token: token,
        status: 200
    });

});

module.exports = router;