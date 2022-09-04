import React, { useState, useEffect, useCallback } from "react";
import MessageItem from "./MessageItem";
import UserSearch from "./UserSearch";
import apiService from "./api/services";
import "./Chat.css";

const MessageList = ({ activeConversation, updateConversation }) => {
  const [conversationContent, setConversationContent] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [inviteModal, setInviteModal] = useState(false);

  const loadConversationContent = useCallback(() => {
    apiService
      .getConversationDetails(activeConversation.id)
      .then((response) => {
        setConversationContent(response.messages);
      });
  }, [activeConversation.id]);
  useEffect(() => {
    loadConversationContent();
    const interval = setInterval(() => {
      loadConversationContent();
    }, 2000);
    return () => clearInterval(interval);
  }, [loadConversationContent]);

  const handleNewMessageChange = (e) => setNewMessage(e.target.value);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    apiService
      .submitMessage(activeConversation.id, { text: newMessage })
      .then((response) => {
        if (response.status === "success") {
          setNewMessage("");
          loadConversationContent();
        }
      });
  };
  const handleDeleteMessage = (message) => {
    apiService
      .deleteMessage(activeConversation.id, message)
      .then((response) => {
        if (response.status === "success") {
          loadConversationContent();
        }
      });
  };

  const handleAddParticipant = (user) => {
    apiService.addParticipant(user, activeConversation.id).then((res) => {
      console.log(res);
      apiService.getConversations().then((response) => {
        let convo = response.conversations.find(
          (conv) => conv.id === activeConversation.id
        );
        updateConversation(convo);
        setInviteModal(false);
      });
    });
  };

  const renderedList = conversationContent.map((message) => {
    return (
      <MessageItem
        key={message.id}
        message={message}
        conversationID={activeConversation.id}
        handleDeleteMessage={handleDeleteMessage}
      />
    );
  });

  return (
    <div className="chat-panel">
      <div id="chat-nav">
        <div id="chat-title" className="title">
          {activeConversation.title}
        </div>
        <button
          id="invite-button"
          className="chat-button"
          onClick={() => setInviteModal(true)}
        >
          Invite Friend
        </button>
        {inviteModal && (
          <UserSearch
            handleAddUser={(user) => {
              handleAddParticipant(user);
            }}
            existingUsers={activeConversation.participants}
            searchAll={false}
          />
        )}
        <div>
          Participants:{" "}
          {activeConversation.participants.map((participant) => {
            return `${participant.username}, `;
          })}
        </div>
      </div>

      {/* <div id="loading-chat">
                        <h3>Loading messages...</h3>
                    </div> */}
      <div id="messages">{renderedList}</div>
      <form id="message-input" onSubmit={handleSubmitMessage}>
        <textarea
          id="chat-message"
          name="chat-message"
          value={newMessage}
          onChange={handleNewMessageChange}
        ></textarea>
        <button id="submitMessage" className="chat-button" type="submit">
          <h3>Submit</h3>
        </button>
      </form>
    </div>
  );
};

export default MessageList;
