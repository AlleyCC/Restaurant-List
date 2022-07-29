const mongoose = require('mongoose')
const db = mongoose.connection
const RestaurantList = require('../restaurants')
const restaurants = require('../../restaurant')
const error = require('mongoose/lib/error')
mongoose.connect(process.env.MONGODB_URI)

db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('MONGODB connected successfully!')
  const restaurantsData = restaurants.results
  
  RestaurantList.insertMany(restaurantsData, (err, restaurant) => {
    if (err) {
      return console.error(err)
    }     
  })
  console.log('done')
})