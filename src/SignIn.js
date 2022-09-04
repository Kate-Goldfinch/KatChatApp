import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import apiService from "./api/services";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const { setUser } = useContext(UserContext);
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleNewUser = (e) => {
    e.preventDefault();
    apiService
      .createUser({
        username,
        password,
      })
      .then((response) =>{
        console.log(response)
        handleSignIn(e)
      })
     .catch(error => {
      console.log(error.message);
      setErrorMessage("Username already registered")
    })
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await apiService.login({
        username,
        password,
      })
      setUser(user);
      setUserName("");
      setPassword("");
    } catch (exception) {
      console.log("wrong password");
      setErrorMessage("Username or password incorrect")
    }
  }

  return (
    <>
      <div className="splash-title">Kat Chat</div>
      <div className="signin-form">
        <form onSubmit={handleNewUser}>
          <input
            value={username}
            onChange={handleUserNameChange}
            placeholder="Username"
          />
          <input
            value={password}
            type="password"
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <div className = 'error-msg'>{errorMessage}</div>
          <button type="submit">Create Account</button>
        </form>

        <form onSubmit={handleSignIn}>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
