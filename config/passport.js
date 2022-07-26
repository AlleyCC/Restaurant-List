const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  
  app.use(passport.initialize())
  app.use(passport.session())
  
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user)  return done(null, false, { message: 'This email is not registered.' })
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) return done(null, false, { message: 'Password is not correct.' })
            return done(null, user) 
          })    
        }) 
      .catch(err => done(err, false))
      })
    )

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URI,
    profileFields: ['displayName', 'email']
  },(accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email })  //使用者存在則回傳資料，若無則產生密碼並新增
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }))

  passport.serializeUser(function(user, done) { 
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null)) 
    }) 
}