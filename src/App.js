import {useState,useEffect} from 'react'
import Header from './Header';
import apiService from './api/services'
import ConversationList from './ConversationList';
import ConversationDetails from './ConversationDetails';
import './App.css';
import { UserContext } from './UserContext';
import SignIn from './SignIn';


function App() {

  const [user, setUser] = useState('')

  const [conversations, setConversations] = useState([])

  const [loggedIn, setLoggedIn] = useState(false)

  const [selectedConversation, setSelectedConversation] = useState(null)
  const [conversationContent, setConversationContent] = useState(null)


useEffect(() => {
  
  user && apiService.getConversations()
            .then(response =>{
              setConversations(response.conversations)
              setLoggedIn(true)
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
        <Header/>
        <SignIn/>
        {loggedIn && !conversationContent && 
        <ConversationList 
            conversations={conversations}
            onConversationSelect = {(conv)=> {selectConversation(conv)}}
        />}

        <ConversationDetails 
          selectedConversation = {selectedConversation}
          conversationContent={conversationContent} 
          updateConversation = {(conv)=> {selectConversation(conv)}}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
