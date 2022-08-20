
import React from 'react'
import ConversationItem from './ConversationItem'

const ConversationList = ({conversations, onConversationSelect}) => {
    const renderedList = conversations.map((conversation) => {
        return <ConversationItem 
                key={conversation.id} 
                conversation={conversation}
                onConversationSelect = {onConversationSelect}
                />
    })

    return <div>{renderedList}</div>
}

export default ConversationList