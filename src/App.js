import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Chat from "./pages/chat/Chat";
import LogIn from "./pages/logIn/logIn";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

const App = () => {
  useEffect(() => {
    localStorage.setItem("isAuthentificated", false);
  }, [])

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact 
            path="/"
            component={LogIn}
          />
          <PrivateRoute 
            path="/chat" 
            component={Chat}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
