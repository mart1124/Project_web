const router = require('express').Router();
const velifytoken = require('./verifyToken');


router.get('/', (req, res) => {
    return res.render('home'), {
        massage: "HomePage"
    }
});

router.get('/home', velifytoken , (req, res) => {
    return res.render('home'), {
        massage: "Admin_HomePage"
    }
});

module.exports = router;