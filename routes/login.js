const express = require('express')
const router = express.Router()
const userSchema = require('../models/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)


router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', async (req, res) => {
    try{
        const user = await userSchema.findOne({email: req.body.email})
        if(user !== null){
            if(await bcrypt.compare(req.body.password, user.password)){
                req.session.isAuth = true;
                req.session.userid = user._id;
                req.session.save(err => {
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect('/')
                    }
                });
            }else{
                res.render('login', {loginErrorMessage: 'Login failed!'})
            }

        }else{
            res.render('login', {loginErrorMessage: 'Login failed!'})
        }

    }catch{
        res.render('login', {loginErrorMessage: 'Login failed!'})
    }
})

module.exports = router