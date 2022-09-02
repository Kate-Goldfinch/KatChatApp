import {useState,useEffect} from 'react'
import Header from './Header';
import apiService from './api/services'
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import './App.css';
import { UserContext } from './UserContext';
import SignIn from './SignIn';


function App() {

  const [user, setUser] = useState(null)
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)

useEffect(() => {
  user && apiService.getConversations(user)
            .then(response =>{
              console.log(response)
              setConversations(response.conversations)
            })
}, [user])

const handleSelectConversation = (conversation) => setActiveConversation(conversation)
  

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        {user ? <Header/> : <SignIn/>}
        <div className="container">
          {user && 
          <ConversationList 
              conversations={conversations}
              onConversationSelect = {(conv)=> {handleSelectConversation(conv)}}
              updateConversationList = {(conv)=> {setConversations(conv)}}
          />}

          {activeConversation && <MessageList 
            activeConversation = {activeConversation}
            updateConversation = {(conv)=> {handleSelectConversation(conv)}}
          />}
        </div>
      </UserContext.Provider>

    </div>
  );
}

export default App;
