const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants')

// 首頁
router.get('/', (req, res) => {
  return RestaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(err))
})

// 搜尋
router.get('/search', (req, res) => {
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


module.exports = router