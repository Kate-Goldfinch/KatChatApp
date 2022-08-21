import React, {useContext, useState} from 'react'
import apiService from './api/services'
import './Chat.css'
import { UserContext } from './UserContext'

const ConversationDetails = ({selectedConversation, conversationContent, updateConversation}) => {
    const [newMessage, setNewMessage] = useState('')
    const {user} = useContext(UserContext)

    if(!conversationContent) return null

    const handleNewMessageChange = (e)=> setNewMessage(e.target.value)

    const submitMessage = (e)=>{
        e.preventDefault()
        apiService.submitMessage(selectedConversation.id, {text: newMessage})
        .then(response =>{
            if(response.status === "success"){
                updateConversation(selectedConversation)
            }
        })
    }

    const deleteMessage = (message)=>{
        apiService.deleteMessage(selectedConversation.id, message)
        .then(response =>{
            if(response.status === "success"){
                updateConversation(selectedConversation)
            }
        })
    }

    const renderedList = conversationContent.map((message) => {
        let newDate = new Date(message.timestamp).toString().slice(0,24)
        
        if(user.username === message.creator){
            return <div className = 'user-message'
            key={message.id}>
            <div className='username'>{message.creator}</div>
            <div className = 'message'>{message.text}</div>
            <div className = 'timestamp'>{newDate}</div>
            <button onClick={() => deleteMessage(message.id)}>X</button>
        </div>
        } else{
            return  <div className = 'other-message'
                        key={message.id}>
                        <div className='username'>{message.creator}</div>
                        <div className = 'message'>{message.text}</div>
                        <div className = 'timestamp'>{newDate}</div>
                    </div>
            }
        })
       

    return <div className="container">
                <div className="side">
                    <p className="title">Conversations</p>
                    <div id="side-nav">
                        <p id="loading-msg">Loading conversations...</p>
                    </div>
                </div>
                <div id="chat-area" className="main">
                    <div id="chat-nav">
                        <p id="chat-title" className="title">{selectedConversation.title}</p>
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
                    onSubmit={submitMessage}>
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

export default ConversationDetails