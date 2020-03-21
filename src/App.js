import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ChatIcon from "@material-ui/icons/Chat";

import Chat from "./chat/Chat";
import MainPage from "./MainPage";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: palevioletred;
  margin: -8px;
`;

const InnerContainer = styled(Box)`
  max-width: 320px;
  padding: 20px;
`;

const Heading = styled(Box)`
  width: 100%;
`;

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
      activeTasks: [
        {
          id: 0,
          owner: "John Smith",
          created: new Date(),
          type: {
            type: "store",
            items: ["milk", "bread", "beer"]
          },
          location: "Hevosenkengänkuja 2, 11011 Helsinki",
          status: "progress"
        }
      ],
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
          status: "progress"
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
      <Container>
        <InnerContainer>
          <AppContext.Provider value={this.state}>
            <Router>
              <Heading>
                <Link to="/home">
                  <AccountBalanceIcon />
                </Link>

                <Link to="/chat">
                  <ChatIcon />
                </Link>
              </Heading>
              <Switch>
                <Route path="/profile">
                  <h2>Profile</h2>
                </Route>
                <Route path="/home">
                  <AppContext.Consumer>
                    {({ tasks, activeTasks, addTask }) => (
                      <MainPage
                        tasks={tasks}
                        addTask={addTask}
                        activeTasks={activeTasks}
                      />
                    )}
                  </AppContext.Consumer>
                </Route>
                <Route path="/chat">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </AppContext.Provider>
        </InnerContainer>
      </Container>
    );
  }
}

export default App;
