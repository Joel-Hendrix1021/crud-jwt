const express = require('express')
const morgan = require('morgan')
const {format} = require('timeago.js')
const session = require('express-session')
const flash = require('connect-flash');
const hbs = require('express-handlebars')
const path = require('path')
const app = express()


//conecting
require('./database')
//settings 
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs',hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layout'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.hbs'
}))
app.set('view engine', 'hbs')

//middleware
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}))

app.use(flash())

app.use( (req, res, next)=> {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg = req.flash('success_msg');
    next();
});
//variables globales

app.locals.formats = format

//router
app.use(require('./router/indexRouter'))
app.use(require('./router/userRouter'))

app.listen(app.get('port'), (req, res)=>{
    console.log('listen in ', app.get('port'))
})
