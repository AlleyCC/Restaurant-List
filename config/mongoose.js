const mongoose = require('mongoose')
const db = mongoose.connection
const error = require('mongoose/lib/error')


//DB連線
mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('MongoDB connected!')
})

module.exports = db