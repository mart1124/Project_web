const router = require('express').Router();
const velifytoken = require('./verifyToken');


router.get('/', (req, res) => {
    return res.render('home'), {
        massage: "HomePage asdasdsdsd"
    }
});

router.get('/home', velifytoken , (req, res) => {
    return res.json({
        massage: "Admin_HomePage"
    })
});

module.exports = router;