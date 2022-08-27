const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  
  return RestaurantList.find({ userId })
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

      filteredRestaurant.length !== 0 ? res.render('index', { restaurants: filteredRestaurant, keyword }) : res.redirect('/')
    })
    .catch(err => console.log(err))
})

//分類搜尋:名稱排列
router.get('/sort_asc', (req, res) =>{
  const userId = req.user._id
  return RestaurantList
    .find({userId})
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants, asc_selected: 'selected' }))
    .catch(err => console.log(err))
})

router.get('/sort_desc', (req, res) =>{
  const userId = req.user._id
  return RestaurantList
    .find({userId})
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants, desc_selected: 'selected' }))
    .catch(err => console.log(err))
})
//按category
router.get('/sort_category', (req, res) =>{
  const userId = req.user._id
  return RestaurantList
    .find({userId})
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants, category_selected: 'selected' }))
    .catch(err => console.log(err))
})
//按location
router.get('/sort_location', (req, res) =>{
  const userId = req.user._id
  return RestaurantList
    .find({userId})
    .lean()
    .sort({ location: 'asc' })
    .then(restaurants => res.render('index', { restaurants, location_selected: 'selected' }))
    .catch(err => console.log(err))
})

module.exports = router