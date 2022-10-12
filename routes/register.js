const express = require('express')
const router = express.Router()
const userSchema = require('../models/User')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new userSchema({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })
        await newUser.save()
        res.redirect('/')
    } catch {
        res.render('error', {message: 'Register error!', locationURL: '/register'})  }
})

module.exports = router