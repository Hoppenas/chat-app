import React, { useState } from 'react';
import "./logIn.scss";
import { Link, useHistory } from "react-router-dom";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
  
    const postUserData = () => {
      let req = new XMLHttpRequest();
  
      req.open("PUT", "https://api.jsonbin.io/b/6090305b8a409667ca049a13", false);
      req.setRequestHeader("Content-Type", "application/json");
      req.setRequestHeader("X-Master-Key", "$2b$10$QYJKmo6nsMVTEw1K7sk33.VrcLemXKVeEh.IyZEBp9LLkJpxBKAGC");
      req.setRequestHeader("X-Bin-Versioning", false);
  
      const userData = {
        email: email,
        password: password,
        birthday: "1987.07.07",
      }
      
      const prepareJSON = JSON.stringify(userData)
      req.send(prepareJSON);
    }

    function checkEmail() {
      let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
      if (!filter.test(email)) {
      document.getElementById('login-email__comment').innerHTML = 'Please provide a valid email address';
      return false;
      } else {
      document.getElementById('login-email__comment').innerHTML = '';
      return true;
      }
    }

    function checkPassword() {
      if (password.length > 0) {
        document.getElementById('login-password__comment').innerHTML = '';
        return true;
      } else {
        document.getElementById('login-password__comment').innerHTML = 'Please ender a valid password';
        return false;
      }
    }

    const submit = () => {
      if(checkPassword() & checkEmail()) {
        postUserData();
        history.push('/chat');
        setEmail("");
        setPassword("");
      }
    }

  return (
    <div className="login-container">
      <div className="login-header">
        Login
      </div>

      <label htmlFor="username">Email</label>
      <div className="login-email-wrapper">
        <input
          type="text"
          placeholder="Pls enter your email"
          className="login-email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <p id="login-email__comment" className="login-comment"></p>
      </div>

      <label htmlFor="password">Password</label>
      <div className="login-email-wrapper">
        <input
              type="password"
              name="password"
              className="login-email"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
        />
        <p id="login-password__comment" className="login-comment"></p>
      </div>
      <Link 
        className="login-btn"
        onClick={submit}
        >
          Log in
      </Link>
    </div>
  )
}

export default LogIn
