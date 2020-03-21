import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ChatIcon from "@material-ui/icons/Chat";

import Chat from "./chat/Chat";
import MainPage from "./MainPage";

function App() {
  return (
    <Router>
      <div>
        <Link to="/home">
          <AccountBalanceIcon />
        </Link>

        <Link to="/chat">
          <ChatIcon />
        </Link>
      </div>
      <Switch>
        <Route path="/profile">
          <h2>Profile</h2>
        </Route>
        <Route path="/home">
          <MainPage />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
