import React, {useState, useEffect} from 'react'
import MessageItem from './MessageItem'
import apiService from './api/services'
import './Chat.css'


const MessageList = ({activeConversation}) => {

    const [conversationContent, setConversationContent] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        loadConversationContent();
        const interval = setInterval(() => {
            loadConversationContent();
          }, 10000);
          return () => clearInterval(interval);
      }, [activeConversation])

      const loadConversationContent = () =>{
        apiService.getConversationDetails(activeConversation.id)
            .then(response =>{
                setConversationContent(response.messages) 
            })
      }

    const handleNewMessageChange = (e)=> setNewMessage(e.target.value)

    const handleSubmitMessage = (e)=>{
        e.preventDefault()
        apiService.submitMessage(activeConversation.id, {text: newMessage})
        .then(response =>{
            if(response.status === "success"){
                setNewMessage('')
                loadConversationContent()
            }
        })
    }
    const handleDeleteMessage = (message)=>{
        apiService.deleteMessage(activeConversation.id, message)
        .then(response =>{
            if(response.status === "success"){
                loadConversationContent()
            }
        })
    }

    const renderedList = conversationContent.map((message) => {
        return <MessageItem 
                key={message.id} 
                message = {message}
                conversationID = {activeConversation.id}
                handleDeleteMessage = {handleDeleteMessage}
                />
    })
    
    return <div className="chat-panel">
                <div id="chat-nav">
                    <p id="chat-title" className="title">{activeConversation.title}</p>
                        {/* <button id="invite-button" className="chat-button">
                            Invite Friend
                        </button>
                        <button id="logout-button" className="chat-button" type="submit">
                            Logout
                        </button> */}
                    </div>
                    {/* <div id="loading-chat">
                        <h3>Loading messages...</h3>
                    </div> */}
                    <div id="messages">
                        {renderedList}
                    </div>
                    <form id="message-input"
                    onSubmit={handleSubmitMessage}>
                        <textarea id="chat-message" 
                                name="chat-message"
                                value={newMessage}
                                onChange={handleNewMessageChange}
                                ></textarea>
                        <button id="submitMessage" className="chat-button" type="submit">
                            <h3>Submit</h3>
                        </button>
                    </form>
                </div>
}

export default MessageList