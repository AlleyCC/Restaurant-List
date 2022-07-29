const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: String,
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String, 
  google_map: String,
  rating: Number,
  description: String,
  done: Boolean,   
})
module.exports = mongoose.model('RestaurantList', restaurantSchema)

