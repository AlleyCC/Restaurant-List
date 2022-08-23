const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')


router.get('/login', (req, res) => {
  res.render('login')
})


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/'
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, passwordConfirm } = req.body
  User.findOne({ email })
    .then(user => {
    if (user){  //使用者已註冊過
    return res.render('register', {
      name,
      email,
      password,
      passwordConfirm
    })
    
    } else {  //使用者未註冊
      User.create({
        name,
        email,
        password,
        passwordConfirm
      })
      .then(() => res.redirect('/'))
      .catch(err=> console.log(err))
    }
  })
  .catch(err => console.log(err))
})

module.exports = router