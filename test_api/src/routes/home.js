const router = require('express').Router();
const velifytoken = require('../middleware/verifyToken');


router.get('/auth', velifytoken, (req, res) => {
    const { authstatus } = req.query
    if (authstatus){
        return res
            .status(200)
            .json({
                status: 200,
                massage: "Is user"
            })
    } else {
        return res
            .status(400)
            .json({
                status: 400,
                massage: "Is not user"
            })
    }
   
});

// router.get('/home', (req, res) => {
//     return res.json({
//         massage: "Admin_HomePage"
//     })
// });

module.exports = router;