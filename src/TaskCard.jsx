import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const CardContainer = styled(Box)`
  display: flex;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #fff;
  color: #333;
  box-shadow: 0px 6px 12px 2px #d4d2d2;
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
  color: #b5b7bd;
`;

const IconDiv = styled(Box)`
  height: 60px;
  width: 60px;
  border-radius: 8px;
  background-color: ${props => (props.active ? "#d9ffe5" : "#f2f0fd")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const Content = styled(Box)`
  width: 220px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
`;
const InnerContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  color: #4b4b4b;
  span {
    font-weight: 700;
  }
`;

const Head = styled(Box)`
  font-size: 14px;
  color: ${props => (props.green ? "#6ac1ac" : "#aaadb3")};
`;
const TaskCard = ({ task, active }) => {
  const iconColor = active ? "#3ec4a6" : "#775aec";
  if (!task) return null;
  return (
    <CardContainer>
      <IconDiv active={active}>
        {task.type.type === "store" ? (
          <ShoppingCartIcon htmlColor={iconColor} />
        ) : (
          <HelpOutlineIcon htmlColor={iconColor} />
        )}
      </IconDiv>
      <Content>
        {active ? (
          <Head green>Olet matkalla auttamaan!</Head>
        ) : (
          <Head>
            {task.owner.name} ({task.owner.age}) odottaa apua
          </Head>
        )}
        {task.type.type === "store" ? (
          <InnerContent>
            <span>Kaupassakäynti</span>
            <Distance>100m</Distance>
          </InnerContent>
        ) : (
          <InnerContent>
            <span>Muu tarve</span>
            <Distance>1.2km</Distance>
          </InnerContent>
        )}
      </Content>
    </CardContainer>
  );
};

export default TaskCard;
