import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const tasks = [
  { id: 1, title: "A great task" },
  { id: 3, title: "A mediocre task" }
];

const MainPage = () => {
  let { url, path } = useRouteMatch();
  return (
    <div>
      <h2>Tasks</h2>

      <ul>
        {tasks.map(task => (
          <li>
            <Link to={`${url}/${task.id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>

      <Switch>
        <Route path={`${path}/:taskId`}>
          <Task />
        </Route>
      </Switch>
    </div>
  );
};

const Task = () => {
  let { taskId } = useParams();
  const task = tasks.find(t => String(t.id) === taskId);
  if (!task) return null;
  return (
    <div
      style={{
        margin: "50px",
        padding: "20px",
        backgroundColor: "palevioletred",
        borderRadius: "5px"
      }}
    >
      <h1>{task.title}</h1>
      <h3>Requested task ID: {task.id}</h3>
    </div>
  );
};

export default MainPage;
