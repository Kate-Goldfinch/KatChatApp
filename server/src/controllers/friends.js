const models = require("../models");
const auth = require("./auth");

//Use regex to search users for partical username match, returns matches
const searchUsers = async (request, response) => {
  const { searchTerm, searchAll } = request.query;
  const user = await auth.validUser(request);
  if (user) {
    let users;
    if (searchAll) {
      users = await models.User.find({
        username: { $regex: searchTerm, $options: "i" },
      });
    } else {
      let u = await models.User.findOne({ user }, "friends");
      users = u.friends;
    }
    if (users) {
      response.json({ status: "success", users });
    } else {
      response.json({ status: "error" });
    }
  } else {
    response.sendStatus(404);
  }
};

// Add user to friends array
const addFriend = async (request, response) => {
  const { username } = request.body;
  const userID = await auth.validUser(request);

  if (userID) {
    const user = await models.User.findOne({ _id: userID });
    const friend = await models.User.findOne({ username });
    if (friend) {
      const newFriend = await models.User.updateOne(
        { _id: userID },
        { $push: { friends: { userID: friend._id, username } } }
      );
      const mirror = await models.User.updateOne(
        { _id: friend._id },
        { $push: { friends: { userID, username: user.username } } }
      );
      console.log(mirror);
      if (newFriend) {
        response.json({ status: "success", newFriend });
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

// Return a list of current users friends
const getFriends = async (request, response) => {
  const user = await auth.validUser(request);
  if (user) {
    const friends = await models.User.findOne(
      { _id: user },
      "friends"
    ).populate("friends");
    response.json(friends);
  } else {
    response.sendStatus(401);
  }
};
//Remove user from list of friends
const deleteFriend = async (request, response) => {
  const { username } = request.body;
  const userID = await auth.validUser(request);

  if (userID) {
    const user = await models.User.findOne({ _id: userID });
    const friend = await models.User.findOne({ username });
    if (friend) {
      const oldFriend = await models.User.updateOne(
        { _id: userID },
        { $pull: { friends: { userID: friend._id, username } } }
      );
      const mirror = await models.User.updateOne(
        { _id: friend._id },
        { $pull: { friends: { userID, username: user.username } } }
      );
      console.log(mirror);
      if (oldFriend) {
        response.json({ status: "success", oldFriend });
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

module.exports = { searchUsers, addFriend, getFriends, deleteFriend };
