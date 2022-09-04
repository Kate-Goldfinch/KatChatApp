import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import "./App.css";

const ConversationItem = ({ conversation, onConversationSelect }) => {
  return (
    <div
      className="conversation-card"
      onClick={() => {
        onConversationSelect(conversation);
      }}
    >
      <p>{conversation.title}</p>
      <div className="icon-box">
        <FiMessageSquare className="icon" />
        <span className="icon-text">{conversation.messages}</span>
      </div>
    </div>
  );
};

export default ConversationItem;
