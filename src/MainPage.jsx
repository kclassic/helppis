import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
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
  margin-block-start: 5px;
`;

const StyledTabs = styled(Tabs)`
  button {
    color: #b1b0b0;
  }
  .MuiTabs-centered {
    justify-content: flex-start;
  }
  .MuiTab-textColorPrimary.Mui-selected {
    color: #9eb5d8;
  }
  .MuiTabs-indicator {
    display: none;
  }
  .MuiTab-root {
    text-transform: none;
  }
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

const btnStyles = {
  backgroundColor: "#4890e2",
  width: "100%",
  color: "white",
  textTransform: "none",
  fontSize: "18px",
  fontWeight: "300",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "20px"
};
const MainPage = ({ tasks, activeTasks, createdTasks, ownTask }) => {
  let { url, path } = useRouteMatch();

  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Switch>
        <Route path={`${path}/:taskId`}>
          <TaskPage tasks={tasks} ownTask={ownTask} />
        </Route>
        <Route path={path}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Avuntarve" />
            <Tab label="Omat ilmoitukset" />
          </StyledTabs>
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
            <Button style={btnStyles}>Pyydä apua</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;
