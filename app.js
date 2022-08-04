const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection
const methodOverride = require('method-override')


const routes = require('./routes/index')



//DB連線
mongoose.connect(process.env.MONGODB_URI)   
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})
//檔案設定
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))


app.use(routes)


// server監聽設定
app.listen(port, () =>{
  console.log(`it is running on http://localhost:${port}`)
})