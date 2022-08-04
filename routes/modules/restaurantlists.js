const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants')


// 詳細資訊頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})



// get: 新增頁面
router.get('/new', (req, res) => {
  console.log('conneting to new page')

  res.render('new')
})

//post: 新增頁面
router.post('/', (req, res) => {
  return RestaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//get: 編輯頁面
router.get('/:id/edit', (req, res) => {
  const { id } = req.params
  return RestaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

//put: 更新已編輯內容
router.put('/:id', (req, res) => {
  const { id } = req.params
  const update = req.body

  return RestaurantList.findByIdAndUpdate(id, update)
    .then(restaurant => res.redirect(`/restaurantlists/${id}`)) //重新導向至詳細資訊頁面
    .catch(err => console.log(err))
})

//delete:刪除清單
router.delete('/:id', (req, res) => {
  const { id } = req.params
  return RestaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router