import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Chat from './chat/Chat';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/profile">
            <h2>Profile</h2>
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/">
            <h2>Home</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Tasks() {
  let { url, path } = useRouteMatch();

  return (
    <div>
      <h2>Tasks</h2>

      <ul>
        <li>
          <Link to={`${url}/1`}>Task 1 Card</Link>
        </li>
        <li>
          <Link to={`${url}/2`}>Task 2 Card</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${path}/:taskId`}>
          <Task />
        </Route>
      </Switch>
    </div>
  );
}

function Task() {
  let { taskId } = useParams();
  return (
    <div
      style={{
        margin: "50px",
        padding: "20px",
        backgroundColor: "palevioletred",
        borderRadius: "5px"
      }}
    >
      <Link to={`/`}>Home</Link>
      <h3>Requested task ID: {taskId}</h3>
    </div>
  );
}

export default App;
