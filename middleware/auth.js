module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('authenticated!')
      return next()
    }
    return res.redirect('/users/login')
  }
}