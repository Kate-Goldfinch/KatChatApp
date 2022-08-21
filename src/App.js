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
  const [activeConversation, setSelectedConversation] = useState(null)
  const [conversationContent, setConversationContent] = useState(null)


useEffect(() => {
  
  user && apiService.getConversations()
            .then(response =>{
              setConversations(response.conversations)
            })
}, [user])


const selectConversation = (conversation) => {
  setSelectedConversation(conversation)
  apiService.getConversationDetails(conversation.id)
    .then(response =>{
      setConversationContent(response.messages) 
    })
   
  }



  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        {user ? <Header/> : <SignIn/>}
        {user && !conversationContent && 
        <ConversationList 
            conversations={conversations}
            onConversationSelect = {(conv)=> {selectConversation(conv)}}
            updateConversationList = {(conv)=> {setConversations(conv)}}
        />}

        <MessageList 
          activeConversation = {activeConversation}
          conversationContent={conversationContent} 
          updateConversation = {(conv)=> {selectConversation(conv)}}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
