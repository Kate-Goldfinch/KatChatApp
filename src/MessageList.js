import React, {useState} from 'react'
import MessageItem from './MessageItem'
import apiService from './api/services'
import './Chat.css'


const MessageList = ({activeConversation, conversationContent, updateConversation}) => {
    const [newMessage, setNewMessage] = useState('')

    if(!conversationContent) return null

    const handleNewMessageChange = (e)=> setNewMessage(e.target.value)

    const handleSubmitMessage = (e)=>{
        e.preventDefault()
        apiService.submitMessage(activeConversation.id, {text: newMessage})
        .then(response =>{
            if(response.status === "success"){
                updateConversation(activeConversation)
            }
        })
    }
    const handleDeleteMessage = (message)=>{
        apiService.deleteMessage(activeConversation.id, message)
        .then(response =>{
            if(response.status === "success"){
                updateConversation(activeConversation)
            }
        })
    }

        const renderedList = conversationContent.map((message) => {
            return <MessageItem 
                    key={message.id} 
                    message = {message}
                    handleDeleteMessage = {handleDeleteMessage}
                    />
        })
    
    return <div className="container">
                <div className="side">
                    <p className="title">Conversations</p>
                    {/* <div id="side-nav">
                        <p id="loading-msg">Loading conversations...</p>
                    </div> */}
                </div>
                <div id="chat-area" className="main">
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
            </div>
}

export default MessageList