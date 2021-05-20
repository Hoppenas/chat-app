import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import {loginUrl, settingsHeaders} from "../../api/endpoints";
import "./logIn.scss";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [inCorrectPassword, setIncorrectPassword] = useState(false);

    const fetchUserData = () => {
      const userData = {
        email: email,
        password: password,
        birthday: "1987.07.07",
      }
      
      const prepareJSON = JSON.stringify(userData)
  
      axios.put(
          loginUrl, 
          prepareJSON, 
          settingsHeaders
      )
      .catch(e => console.log(e));
    }

    const checkEmail = () => {
      // eslint-disable-next-line
      let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
      if (!filter.test(email)) {
        setIncorrectEmail(true)
        return false;
      } else {
        setIncorrectEmail(false)
        return true
      }
    }

    const checkPassword = () => {
      if (password.length > 0) {
        setIncorrectPassword(false);
        return true;
      } else {
        setIncorrectPassword(true);
        return false;
      }
    }

    const handleSubmit = () => {
      if(checkPassword() & checkEmail()) {
        fetchUserData();
        setEmail("");
        setPassword("");
        localStorage.setItem("isAuthentificated", true);
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
          value={email}
        />
        {incorrectEmail && <p className="login-comment">Please provide a valid email address</p>}
      </div>

      <label htmlFor="password">Password</label>
      <div className="login-email-wrapper">
        <input
              type="password"
              name="password"
              className="login-email"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
        />
        {inCorrectPassword && <p className="login-comment">Please ender a valid password</p>}
      </div>
      <Link 
        className="login-btn"
        onClick={handleSubmit}
        to="/chat"
        >
          Log in
      </Link>
    </div>
  )
}

export default LogIn
