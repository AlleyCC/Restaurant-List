const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurantlists = require('./modules/restaurantlists')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/restaurantlists', authenticator, restaurantlists)
router.use('/users', users) //登入頁面

router.use('/', authenticator, home) //首頁


module.exports = router