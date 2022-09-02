const models = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* Create a new user */
const createUser = async (request, response) => {

    const {username, password} = request.body

    const existingUser = await models.User.findOne({ username })
    console.log(username)
    if (existingUser) {
      return response.status(400).json({
        error: 'username must be unique'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = new models.User({
        username,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
}


const login = async (request, response) => {

    const { username, password } = request.body
    console.log(username)
    const user = await models.User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'Invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SESSION_DB_SECRET)
  
    response
      .status(200)
      .send({ token, username: user.username})
}

const validUser = async (request) => {
    
    const authHeader = request.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        const token = authHeader.substring(7)        
        const decodedToken = jwt.verify(token, process.env.SESSION_DB_SECRET)

        if (decodedToken.id) {
            return decodedToken.id
        }
    } 
    return false
}

module.exports = { validUser, createUser, login }
