import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";

import Chat from "./chat/Chat";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import NewTaskPage from "./NewTaskPage";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffdbe7;
  margin: -8px;
  font-family: "Lato", sans-serif;
`;

const InnerContainer = styled(Box)`
  max-width: 320px;
  width: 100%;
  padding: 20px;
`;

const MainTitle = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 25px;
  letter-spacing: 2px;
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
          id: 2,
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
              <div>
                <MainTitle to="/home">
                  <span>Helppis</span>
                </MainTitle>
                <Link to="/chat">
                  <ChatIcon />
                </Link>
                <div style={{ float: "right" }}>
                  <Link to="/profile">
                    <AccountCircleIcon
                      htmlColor={"#51da51"}
                      fontSize={"large"}
                    />
                  </Link>
                </div>
              </div>
              <Switch>
                <Route path="/profile">
                  <AppContext.Consumer>
                    {({ user }) => <ProfilePage user={user} />}
                  </AppContext.Consumer>
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
                <Route path="/addtask">
                  <AppContext.Consumer>
                    {({ addTask, tasks }) => (
                      <NewTaskPage addTask={addTask} tasks={tasks} />
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
