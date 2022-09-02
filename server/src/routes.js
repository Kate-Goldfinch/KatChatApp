const express = require('express')
const auth = require('./controllers/auth')
const friends = require('./controllers/friends')
const conv = require('./controllers/conversations')
const messages = require('./controllers/messages')

const router = express.Router()
 
router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

router.post('/auth/register', auth.createUser)

// router.get('/auth/', auth.getUser)

router.post('/auth/', auth.login)

/* GET conversations returns a list of all current conservations */
router.post('/api/friends', friends.addFriend)

/* GET conversations returns a list of all current conservations */
router.get('/api/friends', friends.getFriends)

/* GET conversations returns a list of all current conservations */
router.get('/api/conversations', conv.getConversations)

/* POST to conversations creates a new conversation */
router.post('/api/conversations', conv.createConversation)

/* GET a conversation returns the list of the last N conversations */
router.get('/api/conversations/:id', messages.getMessages)

/* POST to a conversation to create a new message */
router.post('/api/conversations/:id', messages.createMessage)

/* GET a message URL to get details of a message */
router.get('/api/conversations/:id/:msgid', messages.getMessage)

// /* UPDATE the content of a message*/
// router.put('/api/conversations/:id/:msgid', messages.updateLikes)

/* DELETE to message URL to delete the message */
router.delete('/api/conversations/:id/:msgid', messages.deleteMessage)


module.exports = router 