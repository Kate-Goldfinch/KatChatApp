import axios from "axios";

// const baseURL = 'https://comp3120-chat.herokuapp.com/'
const baseURL = "https://katchatapp-api.onrender.com/"

const createUser = (user) => {
  const request = axios.post(baseURL + "auth/register", user);
  console.log('test')
  return request.then((response) => response.data);
};

const login = (user) => {
  const request = axios.post(baseURL + "auth", user);
  return request.then((response) => response.data);
};

const searchUsers = (params) => {
  const request = axios.get(baseURL + "api/users", { params });
  return request.then((response) => response.data);
};

const getFriends = () => {
  const request = axios.get(baseURL + "api/friends");
  return request.then((response) => response.data);
};

const addFriend = (username) => {
  const request = axios.post(baseURL + "api/friends", { username });
  return request.then((response) => response.data);
};

const deleteFriend = (username) => {
  const request = axios.put(baseURL + "api/friends", { username });
  return request.then((response) => response.data);
};

const addParticipant = (username, id) => {
  const request = axios.put(`${baseURL}api/conversations/${id}`, { username });
  return request.then((response) => response.data);
};

const getConversations = (user) => {
  if (user)
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  const request = axios.get(baseURL + "api/conversations");
  return request.then((response) => response.data);
};

const submitConversation = (title) => {
  const request = axios.post(`${baseURL}api/conversations/`, title);
  return request.then((response) => response.data);
};

const getConversationDetails = (id) => {
  const request = axios.get(`${baseURL}api/conversations/${id}`);
  return request.then((response) => response.data);
};

const submitMessage = (id, message) => {
  const request = axios.post(`${baseURL}api/conversations/${id}`, message);
  return request.then((response) => response.data);
};

const deleteMessage = (convID, messageID) => {
  const request = axios.delete(
    `${baseURL}api/conversations/${convID}/${messageID}`
  );
  return request.then((response) => response.data);
};

const updateMessage = (convID, messageID, newValue) => {
  const request = axios.put(
    `${baseURL}api/conversations/${convID}/${messageID}`,
    { likes: newValue }
  );
  return request.then((response) => response.data);
};

export default {
  createUser,
  login,
  searchUsers,
  deleteFriend,
  addFriend,
  getFriends,
  addParticipant,
  getConversations,
  submitConversation,
  getConversationDetails,
  submitMessage,
  deleteMessage,
  updateMessage,
};
