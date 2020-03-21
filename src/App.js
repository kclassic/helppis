import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ChatIcon from "@material-ui/icons/Chat";

import Chat from "./chat/Chat";
import MainPage from "./MainPage";

const AppContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTask = task => {
      this.setState(state => ({
        tasks: [...state.tasks, task]
      }));
    };

    this.state = {
      user: {
        name: "John Smith",
        location: "00100",
        mummos: [
          {
            location: "mummos home",
            name: "Tyyne"
          }
        ]
      },
      tasks: [
        {
          id: 0,
          owner: "John Smith",
          created: new Date(),
          type: {
            type: "store",
            items: ["milk", "bread", "beer"]
          },
          location: "Hevosenkengänkuja 2, 11011 Helsinki",
          status: "closed"
        },
        {
          id: 1,
          owner: "John Smith",
          created: new Date(),
          type: {
            type: "store",
            items: ["milk", "bread", "beer"]
          },
          location: "Hevosenkengänkuja 2, 11011 Helsinki",
          status: "open"
        },
        {
          id: 13,
          owner: "Tyyne",
          created: new Date(),
          type: {
            type: "apotechary",
            items: ["burana 600mg"]
          },
          location: "Temppelikatu 17, 00100 Helsinki",
          status: "open"
        }
      ],
      addTask: this.addTask
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
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
              <AppContext.Consumer>
                {({ tasks, addTask }) => (
                  <MainPage tasks={tasks} addTask={addTask} />
                )}
              </AppContext.Consumer>
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
