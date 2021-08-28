const router = require('express').Router();
const velify = require('./verifyToken');

router.get('/', velify, (req, res) => {
    res.json({
        massage: "home page"
    })
});

module.exports = router;