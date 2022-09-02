
import React, {useState} from 'react'
import ConversationItem from './ConversationItem'
import apiService from './api/services'

const ConversationList = ({conversations, onConversationSelect, updateConversationList}) => {

    const [newConversation, setNewConversation] = useState('')
    
    const handleNewConversationChange = (e)=> setNewConversation(e.target.value)
    const handleSubmitConversation = (e)=>{
        e.preventDefault()
        apiService.submitConversation({title: newConversation})
        .then(response =>{
            if(response.status === "success"){
                apiService.getConversations()
                .then(response =>{
                updateConversationList(response.conversations)
                    })
                }
            })
    }
    const renderedList = conversations.map((conversation) => {
        return <ConversationItem 
                key={conversation.id} 
                conversation={conversation}
                onConversationSelect = {onConversationSelect}
                />
    })

    return (
    <div className='conv-panel'>
        <div className = 'conv-list'>{renderedList}</div>
        
        <form id="message-input"
        onSubmit={handleSubmitConversation}>
            <textarea id="chat-message" 
                    name="chat-message"
                    value={newConversation}
                    onChange={handleNewConversationChange}
                    ></textarea>
            <button id="submitMessage" className="chat-button" type="submit">
                <h3>Submit</h3>
            </button>
        </form>
    </div>
)}

export default ConversationList