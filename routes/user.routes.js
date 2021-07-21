const router = require('express').Router();
const db = require("../models");
const User = db.user;

router.get('/user/:id', async(req, res) => {
    const user = await User.findByPk(req.params.id);
    
    res.send(user);
});

router.get('/users', async(req, res) => {
    const users = await User.findAll();
    res.send(users);
});

module.exports = router;