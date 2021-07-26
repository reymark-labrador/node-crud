const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    // res.json({
    //     posts: {
    //         title: "my first post",
    //         description: "test description"
    //     }
    // })
    res.send(req.user);
})

module.exports = router;