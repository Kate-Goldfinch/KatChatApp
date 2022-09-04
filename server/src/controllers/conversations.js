const auth = require("./auth");
const models = require("../models");

const createConversation = async (request, response) => {
  const creator = await auth.validUser(request);
  const user = await models.User.findOne({ creator });

  if (creator) {
    const title = request.body.title;
    const username = user.username;
    const userID = user._id;
    const conversation = new models.Conversation({
      creator,
      title,
      participants: { userID, username },
    });
    const returned = await conversation.save();

    if (returned) {
      response.json({ status: "success", id: conversation._id, messages: 0 });
    } else {
      response.json({ status: "error" });
    }
  } else {
    response.sendStatus(401);
  }
};

const getConversations = async (request, response) => {
  const user = await auth.validUser(request);

  if (user) {
    const conversations = await models.Conversation.find({
      "participants.userID": user,
    }).populate("messages");
    response.json({ conversations });
  } else {
    response.sendStatus(401);
  }
};

//If valid user, add them to the participants array for the selected conversation
const addParticipant = async (request, response) => {
  const { username } = request.body;
  const user = await auth.validUser(request);
  const cid = request.params.id;

  if (user) {
    const participant = await models.User.findOne({ username });

    if (participant) {
      const newParticipant = await models.Conversation.updateOne(
        { _id: cid },
        {
          $push: {
            participants: {
              userID: participant._id,
              username: participant.username,
            },
          },
        }
      );
      if (newParticipant) {
        response.json({ status: "success", newParticipant });
      } else {
        response.json({ status: "error" });
      }
    } else {
      response.sendStatus(401);
    }
  } else {
    response.sendStatus(404);
  }
};

module.exports = {
  createConversation,
  getConversations,
  addParticipant,
};
