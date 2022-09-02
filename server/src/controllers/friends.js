const models = require('../models')
const auth = require('./auth')

const addFriend = async (request, response) => {

    const { username } = request.body
    const user = await auth.validUser(request)
    
    if (user) {

        const friend = await models.User.findOne({ username })

        if(friend){
            const newFriend = await models.User.updateOne({user}, {$push: {friends : friend }})

            if (newFriend) {
                response.json({status: "success", id: newFriend._id})
            } else {
                response.json({status: "error"})
            }
        }
        else{
            response.sendStatus(401)
        }
    } else {
        response.sendStatus(404)
    }
}

const getFriends = async (request, response) => {

    const user = await auth.validUser(request)

    if (user) {
    const u = await models.User.findOne({ user })
    console.log(u)
    const friends = u.friends
  
    response.json({friends})
    } else {
        response.sendStatus(401)
    }
}
const deleteFriend = async (request, response) => {

    const { username } = request.body
    const user = await auth.validUser(request)
    
    if (user) {

        const friend = await models.User.findOne({ username })

        if(friend){
            const newFriend = await models.User.updateOne({user}, {$pull: {friends : friend }})

            if (newFriend) {
                response.json({status: "success", id: newFriend._id})
            } else {
                response.json({status: "error"})
            }
        }
        else{
            response.sendStatus(401)
        }
    } else {
        response.sendStatus(404)
    }
}

module.exports = { addFriend, getFriends, deleteFriend }