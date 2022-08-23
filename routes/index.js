const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurantlists = require('./modules/restaurantlists')
const users = require('./modules/users')


router.use('/', home)
router.use('/restaurantlists', restaurantlists)
router.use('/users', users)

module.exports = router