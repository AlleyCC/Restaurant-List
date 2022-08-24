const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants')

// get: 新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

//post: 新增頁面
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, category, location, phone } = req.body
  return RestaurantList.create({ name, category, location, phone, userId})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 詳細資訊頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantList.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

//get: 編輯頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantList.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

//put: 更新已編輯內容
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const update = req.body

  return RestaurantList.findByIdAndUpdate({ _id, userId }, update)
    .then(restaurant => res.redirect(`/restaurantlists/${_id}`)) //重新導向至詳細資訊頁面
    .catch(err => console.log(err))
})

//delete:刪除清單
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantList.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router