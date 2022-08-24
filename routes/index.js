const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurantlists = require('./modules/restaurantlists')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/restaurantlists', authenticator, restaurantlists)
router.use('/', authenticator, home)


module.exports = router