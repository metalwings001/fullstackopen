const bcrypt = require ('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { errorHandler } = require('../utils/middleware')


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs',{title:1,author:1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const {name,username, password} = request.body
  const existingUser = await User.findOne({ username })
  if(existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)

  const user = new User ({
    name,
    username,
    passwordHash,
  })
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
  catch(error) {
    errorHandler(error,request,response)
  }
})

module.exports = usersRouter