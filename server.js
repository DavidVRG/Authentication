/* ENV CONFIG */
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const passport = require('passport')

/* ROUTES */
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')


/* MIDDLEWARES */
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize());

/* MONGODB/MONGOOSE */
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', () => {console.log('MongoDB connected!')})

/* STORE SESSION */
let store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
})
store.on('error', error => console.log(error))

/* EXPRESS SESSION SETTINGS */
app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {secure: false},
    store: store,
    resave: false,
    saveUninitialized: false
}));


/* SET ROUTES */
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)


app.listen(process.env.PORT || 3000)