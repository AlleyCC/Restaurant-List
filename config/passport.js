const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/users')

module.exports = app => {
  
  app.use(passport.initialize())
  app.use(passport.session())
  
  passport.use(new LocalStrategy({ usernameField: 'email' }, (username, password, done) => {
    User.findOne({ username: username })
      .then(user => {
        if (!user)  return done(null, false, { message: 'This email is not registered.' })
        if (password !== password){
          return done(null, false, { message: 'Password is not correct.' })
        }
        return done(null, user)
        })
      .catch(err => done(err, false))
      })
    )
  

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