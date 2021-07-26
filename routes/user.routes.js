const router = require('express').Router();
const db = require("../models");
const User = db.user;

router.get('/user/:id', async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.send(user);
    } catch (error) {
        return next(error);
    }
});

router.get('/users', async(req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;