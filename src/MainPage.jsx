import React from "react";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import styled from "styled-components";
import Button from "./components/BasicButton";
import TaskPage from "./TaskPage";
import TaskCard from "./TaskCard";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const TaskList = styled("ul")`
  list-style: none;
  padding-inline-start: 0;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const MainPage = ({ tasks, activeTasks, createdTasks }) => {
  let { url, path } = useRouteMatch();

  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Switch>
        <Route path={`${path}/:taskId`}>
          <TaskPage tasks={tasks} />
        </Route>
        <Route path={path}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Avun tarve" />
            <Tab label="Omat ilmoitukset" />
          </Tabs>
          <TabPanel value={value} index={0}>
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TaskList>
              {createdTasks
                .filter(t => t.status === "open")
                .map((task, idx) => (
                  <li key={idx}>
                    <Link to={`${url}/${task.id}`}>
                      <TaskCard task={task} />
                    </Link>
                  </li>
                ))}
            </TaskList>
          </TabPanel>
          <Link to={`/addtask`}>
            <Button>Luo Helppis - ilmoitus</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;
