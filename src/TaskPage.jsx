import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { useParams, Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Chip from "@material-ui/core/Chip";
import ChatIcon from "@material-ui/icons/Chat";
import Button from "./components/BasicButton";

const CardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
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

const LowerContent = styled(Box)`
  position: relative;
`;

const ChatPos = styled(Box)`
  position: absolute;
  bottom: 60px;
  right: 8px;
`;

const Head = styled(Box)`
  font-size: 14px;
  color: ${props => (props.green ? "#6ac1ac" : "#aaadb3")};
`;
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

const activeBtnStyle = {
  backgroundColor: "#3ec4a6",
  width: "100%",
  color: "white",
  textTransform: "none",
  fontSize: "18px",
  fontWeight: "300",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "20px"
};
const SubTitle = styled("h3")`
  margin-bottom: 8px;
`;

const StyledChip = styled(Chip)`
  margin: 5px;
  text-transform: capitalize;
`;
const TaskPage = ({ tasks, ownTask }) => {
  let { taskId } = useParams();
  const [task, setTask] = React.useState(
    tasks.find(t => String(t.id) === taskId)
  );
  const active = task.status === "progress";
  const iconColor = active ? "#3ec4a6" : "#775aec";
  const doTask = task => {
    setTask(task);
    ownTask(task);
  };
  if (!task) return null;
  return (
    <CardContainer>
      <Box
        style={{
          display: "flex",
          paddingBottom: "8px"
        }}
      >
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
      </Box>
      <LowerContent>
        <SubTitle>Ostoslista</SubTitle>
        {task.type.items.map((data, idx) => {
          return (
            <StyledChip
              key={idx}
              label={data}
              variant="outlined"
              color="primary"
            />
          );
        })}
        <Button
          style={active ? activeBtnStyle : btnStyles}
          onClick={() => doTask({ ...task, status: "progress" })}
        >
          {active ? "Autettu!" : `Auta ${task.owner.name}a`}
        </Button>
        {active ? (
          <ChatPos>
            <Link to="/chat">
              <ChatIcon htmlColor="#4890e2" />
            </Link>
          </ChatPos>
        ) : null}
      </LowerContent>
    </CardContainer>
  );
};

export default TaskPage;
