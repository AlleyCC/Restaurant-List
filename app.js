const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection
const RestaurantList = require('./models/restaurants')

mongoose.connect(process.env.MONGODB_URI)   //DB連線

db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//載入handlebars後，設定template engine內容
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



// 餐廳清單列表
app.get('/', (req, res) => {
  return RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', {  restaurants }))
    .catch(err => console.error(err))
})

// 餐廳詳細資訊頁面
app.get('/restaurants/:id', (req, res) => {
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
      
      if (filteredRestaurant.length !== 0) {   //若有搜尋成功則顯示結果，若無則重新導回首頁
        return res.render('index', { restaurants: filteredRestaurant, keyword })
      } else {
        return res.redirect('/')
      }
    })
    .catch(err => console.log(err))
})
    
    
    
  //有則顯示搜尋結果，無則跳出搜尋失敗的提示
  // if (restaurants.length >= 1){
  //   res.render('index', { restaurants: restaurants, keyword: keyword })
  // } else {
  //   const alert = `<a class="error" href="http://localhost:3000/" title="back to HomePage">抱歉! 無符合搜尋條件的結果!</a>`
  //   res.render('index', { alert: alert })
  // } 

// get: new頁面
app.get('/restaurantlists/new', (req, res) => {
  console.log('conneting to new page')
  res.render('new')
})

//post: new頁面
app.post('/restaurantlists', (req, res) => {
  console.log(req.body)
  return RestaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// server監聽設定
app.listen(port, () =>{
  console.log(`it is running on http://localhost:${port}`)
})