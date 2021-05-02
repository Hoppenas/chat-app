import Chat from "./pages/chat/Chat";
import LogIn from "./pages/logIn/logIn";
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/" 
            exact 
            component={LogIn} 
          />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
