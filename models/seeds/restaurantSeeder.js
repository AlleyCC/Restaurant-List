const mongoose = require('mongoose')
const RestaurantList = require('../restaurants')
const restaurants = require('../../restaurant')
const db = require('../../config/mongoose')



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