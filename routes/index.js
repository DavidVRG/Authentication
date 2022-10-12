const express = require('express')
const router = express.Router()
const userSchema = require('../models/User')
const messageSchema = require('../models/Message')

const isAuth = (req,res,next) => {
    if(req.session.isAuth) {
        next()
    }else{
        res.redirect('/login')
    }
}

router.get('/', isAuth, (req, res) => {
    res.render('index')
})

router.get('/getProfileName', async (req, res) => {
    const user = await userSchema.findOne({_id: req.session.userid})
    const userName = {username: user.username}
    res.send(userName)
})

router.post('/postMessage', async(req, res) => {

    try{
        const user = await userSchema.findOne({_id: req.session.userid})
        const userName = user.username
        const message = await req.body.text
        const userId = await req.session.userid

        const newMessage = await new messageSchema({
            userId: userId,
            username: userName,
            message: message,
            time: Date.now()
        })

        await newMessage.save()
        res.redirect('/')
    }catch{
        res.render('index', {errorMessage: 'Message create error!'})
    }

})

router.get('/getMessages', async (req, res) => {

    try{
        const messagesWithoutId = []
        const messages = await messageSchema.find({})
        messages.forEach(e => {
            messagesWithoutId.push({username: e.username, message: e.message, time: e.time})
        })
        res.send(messagesWithoutId)
    }
    catch{
        res.render('index', {errorMessage: 'Message render error!'})
    }
})

router.get('/logout', (req, res) => {
    if(req.session.userid){
        req.session.destroy((err) => {
            if(err){
                res.render('index', {errorMessage: 'Logout error!'})
            }else{
                res.redirect('/login')
            }
        })
    }    
})

module.exports = router