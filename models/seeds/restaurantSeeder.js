const RestaurantList = require('../restaurants')
const restaurants = require('./restaurant').results //引入json檔
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const User = require('../users')
const SEED_USER = require('./users').users

if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
db.once('open', () => {    
  Promise.all(
    SEED_USER.map(user => {
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
        .then(user => {
          return Promise.all(Array.from({ length: 3}, (_, i) => {
            const item = restaurants[3-i]
            item.userId = user._id
            restaurants.splice(3-i, 1)
            return RestaurantList.create(item)
            }))
        })   
    })
  ) 
  .then(() => {
    console.log('done')})
  .catch(err => console.log('err'))
})

