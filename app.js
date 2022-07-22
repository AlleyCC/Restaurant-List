const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.use(express.static('public'))

//載入handlebars後，設定template engine內容
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 餐廳清單列表
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results})
})

// 餐廳詳細資訊頁面
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

// 搜尋
app.get('/search', (req, res) => {
  
  const keyword = req.query.keyword
  //依據餐廳名稱或類別進行搜尋
  const restaurants = restaurantList.results.filter((item) => {
    return item.name.toLowerCase().replace(/\s*/g, '').includes(`${keyword.toLowerCase().replace(/\s*/g, '')}`) || item.category.toLowerCase().replace(/\s*/g, '').includes(`${keyword.toLowerCase().replace(/\s*/g, '')}`)})
    // .replace(/\s*/g, '')
  //有則顯示搜尋結果，無則跳出搜尋失敗的提示
  if (restaurants.length >= 1){
    res.render('index', { restaurants: restaurants, keyword: keyword })
  } else {
    const alert = `<a class="error" href="http://localhost:3000/" title="back to HomePage">抱歉! 無符合搜尋條件的結果!</a>`
    res.render('index', { alert: alert })
  } 
})



// server監聽設定
app.listen(port, () =>{
  console.log(`it is running on http://localhost:${port}`)
})