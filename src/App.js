import Chat from "./pages/chat/Chat";
import LogIn from "./pages/logIn/logIn";
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/" 
            exact 
            component={LogIn} 
            // email={email} 
            // setEmail={setEmail} 
            // password={password} 
            // setPassword={setPassword} 
          />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
