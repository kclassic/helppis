import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

const CardContainer = styled(Box)`
  border: 1px solid #333;
  border-radius: 3px;
  margin: 8px 0;
  padding: 15px;
  background-color: ${props => (props.active ? "#d0d0ff" : "#fff")};
`;

const TaskCard = ({ task, active }) => {
  if (!task) return null;
  return (
    <CardContainer active={active}>
      {task.type.type} in {task.location}
    </CardContainer>
  );
};

export default TaskCard;
