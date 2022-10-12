const express = require('express');
const router = express.Router()

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

module.exports = router