import axios from 'axios'

// const baseURL = 'https://comp3120-chat.herokuapp.com/'
const baseURL = 'http://localhost:8102/'

const createUser = user =>{
    const request = axios.post(baseURL+'auth/register',user)
    return request.then(response => response.data)
}

const login = (user) =>{
    const request = axios.post(baseURL+'auth', user)
    return request.then(response => response.data)
}

const getConversations = (user) =>{
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    const request = axios.get(baseURL+'api/conversations')
    return request.then(response => response.data)
}

const submitConversation = (title) =>{
    const request = axios.post(`${baseURL}api/conversations/`, title)
    return request.then(response=> response.data)
}

const getConversationDetails = id =>{
    const request = axios.get(`${baseURL}api/conversations/${id}`)
    return request.then(response => response.data)
}

const submitMessage = (id, message) =>{
    const request = axios.post(`${baseURL}api/conversations/${id}`, message)
    return request.then(response=> response.data)
}

const deleteMessage = (convID, messageID)=>{
    console.log(messageID)
    const request = axios.delete(`${baseURL}api/conversations/${convID}/${messageID}`)
    return request.then(response=> response.data)
}

const updateMessage = (convID, messageID, newValue)=>{
    console.log(newValue)
    const request = axios.put(`${baseURL}api/conversations/${convID}/${messageID}`, {likes: newValue})
    return request.then(response=> response.data)
}

export default {
    createUser,
    login,
    getConversations,
    submitConversation,
    getConversationDetails,
    submitMessage,
    deleteMessage,
    updateMessage
}