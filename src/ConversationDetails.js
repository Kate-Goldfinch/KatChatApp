import React from 'react'

const ConversationDetails = ({conversation}) => {
    console.log(conversation)
    if(!conversation) return null

    const renderedList = conversation.map((message) => {
        return <ul key={message.id}>
                    <li>{message.text}</li>
                    <li>{message.creator}</li>
                </ul>
    })

    return <div>{renderedList}</div>
}

export default ConversationDetails