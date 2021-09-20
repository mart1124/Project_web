const router = require('express').Router();
const velifytoken = require('../middleware/verifyToken');


router.get('/home', velifytoken, (req, res) => {

    return res.json({
        massage: "Is user"
    })
});

// router.get('/home', (req, res) => {
//     return res.json({
//         massage: "Admin_HomePage"
//     })
// });

module.exports = router;