import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const newTask = {
  id: 9,
  owner: "Pasha",
  created: new Date(),
  type: {
    type: "store",
    items: ["milk", "bread", "beer"]
  },
  location: "Home address",
  status: "open"
};

const MainPage = ({ tasks, addTask }) => {
  let { url, path } = useRouteMatch();
  return (
    <div>
      <h2>Tasks</h2>

      <ul>
        {tasks
          .filter(t => t.status === "open")
          .map((task, idx) => (
            <li key={idx}>
              <Link to={`${url}/${task.id}`}>
                {task.type.type} in {task.location}
              </Link>
            </li>
          ))}
      </ul>
      <button onClick={() => addTask(newTask)}>new task</button>
      <Switch>
        <Route path={`${path}/:taskId`}>
          <Task tasks={tasks} />
        </Route>
      </Switch>
    </div>
  );
};

const Task = ({ tasks }) => {
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
      <h1>
        Get {task.type.type} for {task.owner}
      </h1>
      <h3>Requested task ID: {task.id}</h3>
    </div>
  );
};

export default MainPage;
