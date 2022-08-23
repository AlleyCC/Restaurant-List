const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes/index')
const session = require('express-session')
const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()
const port = 3000

//檔案設定
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))

app.use(session({
  secret: 'IAmUrSecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)


app.use(routes)
// server監聽設定
app.listen(port, () =>{
  console.log(`it is running on http://localhost:${port}`)
})