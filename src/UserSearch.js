import React, { useState, useEffect, useContext } from "react";
import apiService from "./api/services";
import { UserContext } from "./UserContext";

const UserSearch = ({ handleAddUser, searchAll, existingUsers }) => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  useEffect(() => {
    const search = () => {
      if (debouncedTerm) {
        apiService
          .searchUsers({ searchTerm: debouncedTerm, searchAll })
          .then((response) => {
            if (response.status === "success") {
              const existingUsersNames = existingUsers.map(
                ({ username }) => username
              );
              let filteredUsers = response.users.filter(
                (u) =>
                  !existingUsersNames.includes(u.username) &&
                  u.username !== user.username
              );
              setUsers(filteredUsers);
            }
          });
      } else {
        setUsers([]);
      }
    };
    search();
  }, [debouncedTerm]);

  const renderUsers = users.map((user) => {
    return (
      <div className="item" key={user.id}>
        <div className="content">{user.username}</div>
        <button
          className="add-user-btn"
          onClick={() => {
            handleAddUser(user.username);
            setUsers([]);
          }}
        >
          +
        </button>
      </div>
    );
  });

  return (
    <>
      <div className="search-form">
        <label>Enter Name</label>
        <input
          className="input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div className="list-item">{renderUsers}</div>
    </>
  );
};

export default UserSearch;
