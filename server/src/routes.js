const express = require('express')
const auth = require('./controllers/auth')
const friends = require('./controllers/friends')
const conv = require('./controllers/conversations')
const messages = require('./controllers/messages')

const router = express.Router()
 
router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Post username and password - saves hashed password to database
router.post('/auth/register', auth.createUser)

// POST username and password - return JWT token if hashed password matches
router.post('/auth/', auth.login)

// GET users - returns a list of all users based on search params
router.get('/api/users', friends.searchUsers)

/* POST to a list friends - returns a list of all current friends */
router.post('/api/friends', friends.addFriend)

/* GET friends - returns a list of all current friends */
router.get('/api/friends', friends.getFriends)

/* UPDATE friends - returns a list of all current friends */
router.put('/api/friends', friends.deleteFriend)

/* GET conversations returns a list of all current conservations */
router.get('/api/conversations', conv.getConversations)

/* POST to conversations creates a new conversation */
router.post('/api/conversations', conv.createConversation)

// UPDATE participants with new user
router.put('/api/conversations/:id', conv.addParticipant)

/* GET a conversation returns the list of the last N conversations */
router.get('/api/conversations/:id', messages.getMessages)

/* POST to a conversation to create a new message */
router.post('/api/conversations/:id', messages.createMessage)

/* GET a message URL to get details of a message */
router.get('/api/conversations/:id/:msgid', messages.getMessage)

/* DELETE to message URL to delete the message */
router.delete('/api/conversations/:id/:msgid', messages.deleteMessage)


module.exports = router 