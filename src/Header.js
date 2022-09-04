import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const Header = ({ setActiveConversation }) => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    setActiveConversation(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <div className="header">
      <div className="header-title">Kat Chat</div>
      <div>
        Signed in as {user.username}
        <button
          id="logout-button"
          className="chat-button"
          type="submit"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
