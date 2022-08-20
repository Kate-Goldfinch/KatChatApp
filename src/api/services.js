import axios from 'axios'

const baseURL = 'https://comp3120-chat.herokuapp.com/'


const getUser = auth =>{
    console.log(auth)
    axios.defaults.headers.common['Authorization'] = `Basic ${auth}`;
    const request = axios.get(baseURL+'auth')
    return request.then(response => response.data)
}

const signIn = newObject =>{
    const request = axios.post(baseURL+'auth/register',newObject)
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

export default {
    getUser,
    signIn,
    getConversations,
    getConversationDetails
}