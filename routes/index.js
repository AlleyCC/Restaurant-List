const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurantlists = require('./modules/restaurantlists')

router.use('/', home)
router.use('/restaurantlists', restaurantlists)

module.exports = router