import React,{useContext} from 'react'
import apiService from './api/services'
import { UserContext } from './UserContext'

const MessageItem = ({message, conversationID, handleDeleteMessage}) => {
    const {user} = useContext(UserContext)

 

    let newDate = new Date(message.timestamp).toString().slice(0,24)
        
        if(user.username === message.creator){
            return <div className = 'user-message'
            key={message.id}>
            <div className='username'>{message.creator}</div>
            <div className = 'message'>{message.text}</div>
            <div className = 'timestamp'>{newDate}</div>
            <button onClick={() => handleDeleteMessage(message.id)}>X</button>
        </div>
        } else{
            return  <div className = 'other-message'
                        onClick = {()=> apiService.updateMessage(conversationID, message.id, 1)}
                        key={message.id}>
                        <div className='username'>{message.creator}</div>
                        <div className = 'message'>{message.text}</div>
                        {/* <div>{message.likes} </div> */}
                        <div className = 'timestamp'>{newDate}</div>
                    </div>
            }
}

export default MessageItem