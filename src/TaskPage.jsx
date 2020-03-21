import React from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import Box from "@material-ui/core/Box";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Button from "./components/BasicButton";

const TaskContainer = styled(Box)`
position: relative;
  border: 1px solid #797979;
  border-radius: 3px;
  margin: 15px 0;
  padding: 15px;
  padding-bottom: 35px;
  background-color: ${props => (props.active ? "#d0d0ff" : "#fff")};
  color: #333;
  box-shadow: 3px 3px 5px #b5b5b5;
  ${props => (props.active ? "box-shadow: inset 0px 0px 5px #272727;" : null)}
  }
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
const DetailsContainer = styled(Box)`
  padding: 10px;
`;

const SmallText = styled("span")`
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 10px;
`;

const TaskPage = ({ tasks }) => {
  let { taskId } = useParams();
  const task = tasks.find(t => String(t.id) === taskId);
  if (!task) return null;
  return (
    <TaskContainer>
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
      <DetailsContainer>shopping list here</DetailsContainer>
      <span>
        {task.owner.name}, {task.owner.age}, odottaa avustajaa
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: "8px"
        }}
      >
        <Button style={{ backgroundColor: "#d5d5ff" }}>
          Auta {task.owner.name}a
        </Button>
      </div>
      <SmallText>Ilmoitus jätetty {task.created.toDateString()}</SmallText>
    </TaskContainer>
  );
};

export default TaskPage;
