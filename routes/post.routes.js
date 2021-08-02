const router = require('express').Router();
const verify = require('./verifyToken');
const db = require("../models");
const User = db.user;

router.get('/', verify, async(req, res) => {
    // res.json({
    //     posts: {
    //         title: "my first post",
    //         description: "test description"
    //     }
    // })
    try {
        const user = await User.findByPk(req.user.id);
        res.send(user);
    } catch (error) {
        return next(error);
    }
})

module.exports = router;