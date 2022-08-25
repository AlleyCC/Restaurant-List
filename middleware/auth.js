module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('authenticated!')
      return next()
    }
    req.flash('warning_msg', '請先登入帳戶。')
    res.redirect('/users/login')
  }
}