import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
  background-color: #f7faff;
  margin: -8px;
  font-family: "Lato", sans-serif;
  a {
    text-decoration: none;
  }
`;

const InnerContainer = styled(Box)`
  max-width: 320px;
  width: 100%;
  padding: 20px;
`;

const Header = styled(Box)`
  padding-bottom: 12px;
`;

const MainTitle = styled(Link)`
  color: #333;
  font-size: 25px;
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

    this.ownTask = task => {
      this.setState(state => ({
        activeTasks: [
          ...state.activeTasks,
          ...state.tasks
            .map(t => {
              if (t.id === task.id) {
                return task;
              }
              return null;
            })
            .filter(Boolean)
        ],
        tasks: state.tasks.map(t => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        })
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
      createdTasks: [
        {
          id: 0,
          owner: {
            name: "Great Tyyne",
            age: "95"
          },
          created: new Date(),
          type: {
            type: "store",
            items: ["maito", "leipä", "jauheliha", "kahvi", "pasta"]
          },
          location: "Iso-mumminkatu 2",
          status: "open"
        }
      ],
      activeTasks: [
        // {
        //   id: 0,
        //   owner: {
        //     name: "Marko",
        //     age: "44"
        //   },
        //   created: new Date(),
        //   type: {
        //     type: "store",
        //     items: ["milk", "bread", "beer"]
        //   },
        //   location: "Hevosenkengänkuja 2, 11011 Helsinki",
        //   status: "progress"
        // }
      ],
      tasks: [
        {
          id: 0,
          owner: {
            name: "Pekka",
            age: "44"
          },
          created: new Date(),
          type: {
            type: "store",
            items: ["maito", "leipä", "jauheliha", "kahvi", "pasta"]
          },
          location: "Hevosenkengänkuja 2, 11011 Helsinki",
          status: "open"
        },
        {
          id: 1,
          owner: {
            name: "Alpo",
            age: "68"
          },
          created: new Date(),
          type: {
            type: "store",
            items: ["margariini", "kahvi", "juusto", "jugurtti"]
          },
          location: "Hevosenkengänkuja 2, 11011 Helsinki",
          status: "open"
        },
        {
          id: 2,
          owner: {
            name: "Tyyne",
            age: "84"
          },
          created: new Date(),
          type: {
            type: "apotechary",
            items: ["burana 600mg"]
          },
          location: "Temppelikatu 17, 00100 Helsinki",
          status: "open"
        }
      ],
      addTask: this.addTask,
      ownTask: this.ownTask
    };
  }

  render() {
    return (
      <Container>
        <InnerContainer>
          <AppContext.Provider value={this.state}>
            <Router>
              <Header>
                <MainTitle to="/home">
                  <span>Helppis</span>
                </MainTitle>
                <div style={{ float: "right" }}>
                  <Link to="/profile">
                    <AccountCircleIcon
                      htmlColor={"#9c9c9c"}
                      fontSize={"large"}
                    />
                  </Link>
                </div>
              </Header>
              <Switch>
                <Route path="/profile">
                  <AppContext.Consumer>
                    {({ user }) => <ProfilePage user={user} />}
                  </AppContext.Consumer>
                </Route>
                <Route path="/home">
                  <AppContext.Consumer>
                    {({
                      tasks,
                      activeTasks,
                      addTask,
                      createdTasks,
                      ownTask
                    }) => (
                      <MainPage
                        tasks={tasks}
                        addTask={addTask}
                        activeTasks={activeTasks}
                        createdTasks={createdTasks}
                        ownTask={ownTask}
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
