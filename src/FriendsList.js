import React, { useState, useEffect } from "react";
import apiService from "./api/services";
import UserSearch from "./UserSearch";

const FriendsList = () => {
  const [inviteModal, setInviteModal] = useState(false);
  const [friends, setFriends] = useState([]);

  const handleAddFriend = (user) => {
    apiService.addFriend(user).then((res) => {
      console.log(res);
      apiService.getFriends().then((response) => {
        setFriends(response.friends);
        setInviteModal(false);
      });
    });
  };

  const handleDeleteFriend = (user) => {
    apiService.deleteFriend(user).then((res) => {
      console.log(res);
      apiService.getFriends().then((response) => {
        setFriends(response.friends);
        setInviteModal(false);
      });
    });
  };

  useEffect(() => {
    apiService.getFriends().then((response) => {
      setFriends(response.friends);
    });
    return () => {
      setInviteModal(false);
      setFriends([]);
    };
  }, []);

  return (
    <div className="friends-list">
      <h2>Friends</h2>
      {friends.map((friend) => {
        return (
          <div key={friend._id}>
            {friend.username}
            <button
              className="delete-user-btn"
              onClick={() => handleDeleteFriend(friend.username)}
            >
              X
            </button>
          </div>
        );
      })}
      <button
        id="invite-button"
        className="chat-button"
        onClick={() => setInviteModal(true)}
      >
        Search For Friend
      </button>
      {inviteModal && (
        <UserSearch
          handleAddUser={(user) => {
            handleAddFriend(user);
          }}
          existingUsers={friends}
          searchAll={true}
        />
      )}
    </div>
  );
};

export default FriendsList;
