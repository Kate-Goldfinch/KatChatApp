import { useState } from "react";
import Header from "./Header";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import FriendsList from "./FriendsList";
import SignIn from "./SignIn";
import "./App.css";
import { UserContext } from "./UserContext";

function App() {
  const [user, setUser] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);

  const handleSelectConversation = (conversation) =>
    setActiveConversation(conversation);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        {user ? (
          <Header setActiveConversation={setActiveConversation} />
        ) : (
          <SignIn />
        )}
        
          {user && (
            <div className="container">
            <ConversationList
              user={user}
              onConversationSelect={(conv) => {
                handleSelectConversation(conv);
              }}
            />

          {activeConversation ? (
            <MessageList
              activeConversation={activeConversation}
              updateConversation={(conv) => {
                handleSelectConversation(conv);
              }}
            />
          ) : <div></div>}
          <FriendsList />
          </div>
          )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
