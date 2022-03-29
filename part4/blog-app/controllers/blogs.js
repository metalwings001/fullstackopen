const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../utils/middleware')
/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {name:1,username:1}) 
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  //console.log(request.body)
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  catch(error) {
    errorHandler(error,request,response)
  }
})
blogsRouter.delete('/:id', async (request,response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  catch(error) {
    errorHandler(error,request,response)
  }
})

module.exports = blogsRouter