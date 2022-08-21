import React from 'react'

const ConversationItem = ({conversation, onConversationSelect}) => {
    
  return (
    <div onClick = {()=> {onConversationSelect(conversation)}}>
        <p>{conversation.title}</p>
        <p>{conversation.messages}</p>
    </div>
  )
}

export default ConversationItem