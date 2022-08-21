import axios from 'axios'

const baseURL = 'https://comp3120-chat.herokuapp.com/'


const getUser = auth =>{
    console.log(auth)
    axios.defaults.headers.common['Authorization'] = `Basic ${auth}`;
    const request = axios.get(baseURL+'auth')
    return request.then(response => response.data)
}

const signIn = username =>{
    const request = axios.post(baseURL+'auth/register',username)
    return request.then(response => response.data)
}

const getConversations = () =>{
    const request = axios.get(baseURL+'api/conversations')
    return request.then(response => response.data)
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

export default {
    getUser,
    signIn,
    getConversations,
    getConversationDetails,
    submitMessage,
    deleteMessage
}