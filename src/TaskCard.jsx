import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const CardContainer = styled(Box)`
  border: 1px solid #333;
  border-radius: 3px;
  margin: 8px 0;
  padding: 15px;
  background-color: ${props => (props.active ? "#d0d0ff" : "#fff")};
  color: #333;
`;

const IconContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  span {
    margin-left: 12px;
  }
`;

const Distance = styled(Box)`
  margin-left: auto;
`;

const TaskCard = ({ task, active }) => {
  if (!task) return null;
  return (
    <CardContainer active={active}>
      <IconContainer>
        {task.type.type === "store" ? (
          <>
            <ShoppingCartIcon htmlColor="#333" />
            <span>Kaupassa käynti</span>
            <Distance>100m</Distance>
          </>
        ) : (
          <>
            <HelpOutlineIcon htmlColor="#333" />
            <span>Muu tarve</span>
            <Distance>1.3km</Distance>
          </>
        )}
      </IconContainer>
      <span>
        {task.owner} {task.location}
      </span>
    </CardContainer>
  );
};

export default TaskCard;
