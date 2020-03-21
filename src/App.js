import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import MainPage from "./MainPage";

function App() {
  return (
    <Router>
      <div>
        <Link to="/home">
          <AccountBalanceIcon />
        </Link>
      </div>
      <Switch>
        <Route path="/profile">
          <h2>Profile</h2>
        </Route>
        <Route path="/home">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
