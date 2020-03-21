import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/BasicButton";
import TaskPage from "./TaskPage";
import TaskCard from "./TaskCard";

const TaskList = styled("ul")`
  list-style: none;
  padding-inline-start: 0;
`;

const NewTaskButton = styled(Button)``;

const MainPage = ({ tasks, activeTasks }) => {
  let { url, path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}/:taskId`}>
          <TaskPage tasks={tasks} />
        </Route>
        <Route path={path}>
          <h2>Tasks</h2>
          <TaskList>
            {activeTasks.map((task, idx) => (
              <li key={idx}>
                <Link to={`${url}/${task.id}`}>
                  <TaskCard task={task} active />
                </Link>
              </li>
            ))}
          </TaskList>
          <TaskList>
            {tasks
              .filter(t => t.status === "open")
              .map((task, idx) => (
                <li key={idx}>
                  <Link to={`${url}/${task.id}`}>
                    <TaskCard task={task} />
                  </Link>
                </li>
              ))}
          </TaskList>
          <Link to={`/addtask`}>
            <Button>New task</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;
