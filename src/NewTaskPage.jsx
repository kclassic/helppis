import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import UpdateIcon from "@material-ui/icons/Update";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Button from "./components/BasicButton";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

const Title = styled("h1")``;
const SubTitle = styled("h3")``;
const ThingContainer = styled(Box)`
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 8px;
  background-color: #fff;
  transition: all 0.25s ease;
  box-shadow: 0px 6px 12px 2px #d4d2d2;
  ${props =>
    props.active
      ? "box-shadow: inset 0px 0px 5px #272727; color: #6ac1ac;"
      : null}
  display: flex;
  align-items: center;
  span {
    margin-left: 8px;
  }
  cursor: pointer;
`;

const templates = [
  { title: "Kauppa tai apteekki", icon: ShoppingCartIcon, id: 1 },
  { title: "Muu, esim koiran ulkoilutus", icon: HelpOutlineIcon, id: 2 }
];

const mummos = [
  { name: "Tyyne", age: 72, location: "Kampinkuja 1", id: 1 },
  { name: "Raimo", age: 80, location: "Stockmannin yläkerta", id: 2 }
];

const timeOptions = [
  { title: "Tänään", icon: QueryBuilderIcon, id: 1 },
  { title: "Huomenna", icon: UpdateIcon, id: 2 },
  { title: "Tällä viikolla", icon: DateRangeIcon, id: 3 }
];
const StyledChip = styled(Chip)`
  margin: 5px;
  text-transform: capitalize;
`;
const newTask = {
  id: 9,
  owner: {
    name: "Pasha",
    age: 21
  },
  created: new Date(),
  type: {
    type: "store",
    items: ["milk", "bread", "beer"]
  },
  location: "Home address",
  status: "open"
};
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

const btnStylesPrev = {
  backgroundColor: "#fff",
  width: "100%",
  color: "#333",
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

const NewTask = ({ tasks, addTask }) => {
  const [template, setTemplate] = React.useState(0);
  const [mummo, setMummo] = React.useState(0);
  const [timeOption, setTimeOption] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [shopItem, setShopItem] = React.useState([
    "Banaaneita 1kg",
    "Vessapaperia"
  ]);

  const handleInput = text => {
    setShopItem([...shopItem, text]);
  };

  const handleDelete = chipToDelete => () => {
    setShopItem(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };
  const [text, setText] = React.useState("");

  const submitRequest = () => {
    const task = {
      ...newTask,
      id: tasks.length,
      owner: {
        name: mummo.name,
        age: mummo.age
      },
      location: mummo.location,
      type: {
        items: shopItem,
        type: template.title === "Kauppa tai apteekki" ? "store" : "other"
      }
    };
    addTask(task);
    setSubmitted(true);
  };

  const goToStep = nextStep => {
    setStep(nextStep);
  };

  if (submitted) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <Title>Luo avunpyyntö</Title>
      {step === 0 ? (
        <>
          <SubTitle>Valitse tarve</SubTitle>
          {templates.map((t, idx) => (
            <ThingContainer
              key={idx}
              active={template.id === t.id}
              onClick={() => setTemplate(t)}
            >
              {React.createElement(t.icon, {})}
              <span>{t.title}</span>
            </ThingContainer>
          ))}

          <SubTitle>Avuntarvitsija</SubTitle>
          {mummos.map((m, idx) => (
            <ThingContainer
              key={idx}
              active={mummo.id === m.id}
              onClick={() => setMummo(m)}
            >
              <PersonOutlineIcon />
              <span>{m.name},</span>
              <span>{m.age},</span>
              <span>{m.location}</span>
            </ThingContainer>
          ))}

          <SubTitle>Tarpeen kiireellisyys</SubTitle>
          {timeOptions.map((opt, idx) => (
            <ThingContainer
              key={idx}
              active={timeOption.id === opt.id}
              onClick={() => setTimeOption(opt)}
            >
              {React.createElement(opt.icon, {})}
              <span>{opt.title}</span>
            </ThingContainer>
          ))}
          <Button style={btnStyles} onClick={() => goToStep(1)}>
            Seuraava
          </Button>
        </>
      ) : null}
      {step === 1 ? (
        <>
          <Button style={btnStylesPrev} onClick={() => goToStep(0)}>
            Edellinen
          </Button>
          <Title>Ostoslista</Title>
          <SubTitle>Lisää tuotteen nimi ja lukumäärä</SubTitle>
          <TextField
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyPress={ev => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                handleInput(text);
                setText("");
              }
            }}
          />
          <SubTitle>Ostokset</SubTitle>
          {shopItem.map((data, idx) => {
            return (
              <StyledChip
                key={idx}
                label={data}
                onDelete={handleDelete(data)}
                variant="outlined"
                color="primary"
              />
            );
          })}
          <Button style={activeBtnStyle} onClick={submitRequest}>
            Lähetä avunpyyntö
          </Button>
        </>
      ) : null}
    </>
  );
};

export default NewTask;
