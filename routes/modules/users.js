const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')

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
  const errors = []
  if ( !name || !email || !password || !passwordConfirm ){
    errors.push({ message: '欄位填寫不完整'})
  }
  if ( password !== passwordConfirm){
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length){
    res.render('register', {
      name,
      email,
      password,
      passwordConfirm,
      errors
    })
  }
  User.findOne({ email })
    .then(user => {
    if (user){  //使用者已註冊過
    errors.push({ message: '這個帳號已註冊' })
    return res.render('register', {
      name,
      email,
      password,
      passwordConfirm,
      errors
    })
    }   
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash =>
        User.create({  //使用者未註冊
        name,
        email,
        password: hash, 
      }))
      .then(() => res.redirect('/'))
      .catch(err=> console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err)
  })

  req.flash('success_msg', '成功登出!')
  
  res.redirect('/users/login')
 
})
module.exports = router
