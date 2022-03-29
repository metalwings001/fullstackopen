const mongoose = require('mongoose')
const User = require('./user')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  }
})

module.exports = mongoose.model('Blog', blogSchema)