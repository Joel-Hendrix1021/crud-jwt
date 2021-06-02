const express = require('express')
const morgan = require('morgan')
const flash = require('connect-flash');
const hbs = require('express-handlebars')
const path = require('path')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const handlebars = require('handlebars')
const session = require('express-session')
const passport = require('passport')

const app = express()

//conecting
require('./database')
//
require('./config/auth')
//settings 
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs',hbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
    layoutsDir: path.join(__dirname, 'views/layout'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs',
    helpers: require('./helpers/help')
}))
app.set('view engine', 'hbs')


//middleware
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use( (req, res, next)=> {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user
   
    next();
});



//router
app.use(require('./router/indexRouter'))
app.use(require('./router/userRouter'))

app.listen(app.get('port'), (req, res)=>{
    console.log('listen in ', app.get('port'))
})
