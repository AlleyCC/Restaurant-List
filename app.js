const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')

if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const routes = require('./routes/index')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

//檔案、樣板設定
app.use(express.static('public'))
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () =>{
  console.log(`it is running on http://localhost:${PORT}`)
})