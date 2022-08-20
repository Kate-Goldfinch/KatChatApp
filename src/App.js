import {useState,useEffect} from 'react'
import Header from './Header';
import apiService from './api/services'
import ConversationList from './ConversationList';
import ConversationDetails from './ConversationDetails';
import './App.css';


function App() {

  const [newUserName, setNewUserName] = useState('')
  const [user, setUser] = useState('')
  const [conversations, setConversations] = useState([])

  const [loggedIn, setLoggedIn] = useState(false)

  const [conversationDetails, setConversationDetails] = useState(null)


useEffect(() => {
  
  user && apiService.getConversations()
            .then(response =>{
              setConversations(...conversations,response.conversations)
              console.log(conversations)
              setLoggedIn(true)
            })
}, [user])

const signIn = (e)=>{
  e.preventDefault()
  const newObject = {
  username: newUserName
  }
  // apiService
  //   .signIn(newObject)
  //   .then(response =>{
  //     console.log(response)
  //     if(response.status !== "username taken"){
        // apiService.getUser(response.token)
        // setUser(response.username)
        apiService.getUser('62f7740c6c017917269ca417')
        setUser('test')
      // }
      // })
}

const selectConversation = (conversation) => {
  console.log(conversation)
    apiService.getConversationDetails(conversation.id)
    .then(response =>{
      console.log(response)
      setConversationDetails(response.messages) 
    })
   
  }

const handleUserNameChange = (e)=> setNewUserName(e.target.value)

  return (
    <div className="App">

      <Header user={user}/>
      <form onSubmit={signIn}>
        <input 
          value={newUserName}
          onChange={handleUserNameChange}
          placeholder='Username'/>
        <button type="submit">Sign In</button>
      </form>
      {loggedIn && 
        !conversationDetails && 
        <ConversationList 
            conversations={conversations}
            onConversationSelect = {(c)=> {selectConversation(c)}}
      />}

      <ConversationDetails conversation={conversationDetails} />
    </div>
  );
}

export default App;
