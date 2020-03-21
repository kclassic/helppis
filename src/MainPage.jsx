import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Task from "./Task";

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
      <Switch>
        <Route path={`${path}/:taskId`}>
          <Task tasks={tasks} />
        </Route>
        <Route path={path}>
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
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;
