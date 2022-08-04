const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection
const RestaurantList = require('./models/restaurants')
const methodOverride = require('method-override')

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

// 首頁
app.get('/', (req, res) => {
  return RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

// 詳細資訊頁面
app.get('/restaurantlists/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// 搜尋
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return RestaurantList.find()   //依據餐廳名稱或類別進行搜尋
    .lean()
    .then(restaurant => {
      const filteredRestaurant = restaurant.filter(item => item.name.toLowerCase().replace(/\s*/g, '').includes(`${keyword.toLowerCase().replace(/\s*/g, '')}`) || item.category.toLowerCase().replace(/\s*/g, '').includes(`${keyword.toLowerCase().replace(/\s*/g, '')}`))
      
      // if (filteredRestaurant.length !== 0) {   //若有搜尋成功則顯示結果，若無則重新導回首頁
      //   return res.render('index', { restaurants: filteredRestaurant, keyword })
      // } else {
      //   return res.redirect('/')
      // }
      filteredRestaurant.length !== 0 ? res.render('index', { restaurants: filteredRestaurant, keyword }) : res.redirect('/')
    })
    .catch(err => console.log(err))
})

// get: 新增頁面
app.get('/restaurants/new', (req, res) => {
  console.log('conneting to new page')
  
  res.render('new')
})

//post: 新增頁面
app.post('/restaurantlists', (req, res) => {
  return RestaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//get: 編輯頁面
app.get('/restaurantlists/:id/edit', (req, res) => {
  const { id } = req.params
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

//post: 更新已編輯內容
app.put('/restaurantlists/:id', (req, res) => {
  const { id } = req.params
  const update = req.body
  
  return RestaurantList.findByIdAndUpdate(id, update)
    .then(restaurant => res.redirect(`/restaurantlists/${id}`)) //重新導向至詳細資訊頁面
    .catch(err => console.log(err))
})

//delete:刪除清單
app.delete('/restaurantlists/:id', (req, res) => {
  const { id } = req.params
  return RestaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

// server監聽設定
app.listen(port, () =>{
  console.log(`it is running on http://localhost:${port}`)
})