// import React from "react";
// import { useParams, Link } from "react-router-dom";

// import styled from "styled-components";
// import Box from "@material-ui/core/Box";

// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
// import Button from "./components/BasicButton";
// import ChatIcon from "@material-ui/icons/Chat";

// const TaskContainer = styled(Box)`
// position: relative;
//   border: 1px solid #797979;
//   border-radius: 3px;
//   margin: 15px 0;
//   padding: 15px;
//   padding-bottom: 35px;
//   background-color: ${props => (props.active ? "#d0d0ff" : "#fff")};
//   color: #333;
//   box-shadow: 3px 3px 5px #b5b5b5;
//   ${props => (props.active ? "box-shadow: inset 0px 0px 5px #272727;" : null)}
//   }
// `;

// const IconContainer = styled(Box)`
//   display: flex;
//   align-items: center;
//   margin-bottom: 12px;
//   span {
//     margin-left: 12px;
//   }
// `;

// const Distance = styled(Box)`
//   margin-left: auto;
// `;
// const DetailsContainer = styled(Box)`
//   padding: 10px;
// `;

// const SmallText = styled("span")`
//   position: absolute;
//   bottom: 8px;
//   right: 8px;
//   font-size: 10px;
// `;

// const TaskPage = ({ tasks, ownTask }) => {
//   let { taskId } = useParams();
//   const [task, setTask] = React.useState(
//     tasks.find(t => String(t.id) === taskId)
//   );
//   const doTask = task => {
//     setTask(task);
//     ownTask(task);
//   };
//   if (!task) return null;
//   return (
//     <TaskContainer>
//       {task.status === "progress" ? (
//         <>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               paddingTop: "8px",
//               paddingBottom: "8px"
//             }}
//           >
//             <span>Olet auttamassa</span>
//             <Link to="/chat">
//               <ChatIcon />
//             </Link>
//           </div>
//         </>
//       ) : null}
//       <IconContainer>
//         {task.type.type === "store" ? (
//           <>
//             <ShoppingCartIcon htmlColor="#333" />
//             <span>Kaupassa käynti</span>
//             <Distance>100m</Distance>
//           </>
//         ) : (
//           <>
//             <HelpOutlineIcon htmlColor="#333" />
//             <span>Muu tarve</span>
//             <Distance>1.3km</Distance>
//           </>
//         )}
//       </IconContainer>
//       <DetailsContainer>shopping list here</DetailsContainer>
//       <span>
//         {task.owner.name}, {task.owner.age}, odottaa avustajaa
//       </span>
//       {task.status === "open" ? (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             paddingTop: "8px"
//           }}
//         >
//           <Button
//             style={{ backgroundColor: "#d5d5ff" }}
//             onClick={() => doTask({ ...task, status: "progress" })}
//           >
//             Auta {task.owner.name}a
//           </Button>
//         </div>
//       ) : null}
//       <SmallText>Ilmoitus jätetty {task.created.toDateString()}</SmallText>
//     </TaskContainer>
//   );
// };

// export default TaskPage;
import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { useParams, Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
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

const LowerContent = styled(Box)``;

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
        <Button
          style={active ? activeBtnStyle : btnStyles}
          onClick={() => doTask({ ...task, status: "progress" })}
        >
          {active ? "Autettu!" : `Auta ${task.owner.name}a`}
        </Button>
      </LowerContent>
    </CardContainer>
  );
};

export default TaskPage;
