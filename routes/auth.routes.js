const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;
const { registerValidation, loginValidation } = require('../validations/auth');

router.post('/register', async(req, res, next) => {
    try {
        //Validate user
        const {error} = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
       
        //Check email if exist
        const emailExist = await User.findOne({
            where:{ email: req.body.email }
        });
        if (emailExist) return res.status(400).send('Email already exist');

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //Create new user
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword
        });

        res.send({user: user.id});
    } catch (error) {
        return next(error);
    }
});

router.post('/login', async(req, res, next) => {
    try {
        const {error} = loginValidation(req.body);
        if (error) res.status(400).send(error.details[0].message);
        
        //Check user by email if exist
        const user = await User.findOne({
            where:{ email: req.body.email }
        });
        if(!user) return res.status(400).send('Invalid email and password');

        //Validate password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Invalid email and password');

        //Create and assign token
        const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } catch (error) {
        return next(error);
    }
});

module.exports = router; 