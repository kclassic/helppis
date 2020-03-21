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
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

const Title = styled("h1")``;
const SubTitle = styled("h3")``;
const ThingContainer = styled(Box)`
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 8px;
  background-color: ${props => (props.active ? "#94ffab" : "#e6e6e6")};
  transition: all 0.25s ease;
  ${props => (props.active ? "box-shadow: inset 0px 0px 5px #272727;" : null)}
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

const NewTask = ({ tasks, addTask }) => {
  const [template, setTemplate] = React.useState(0);
  const [mummo, setMummo] = React.useState(0);
  const [timeOption, setTimeOption] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [shopItem, setShopItem] = React.useState([
    { key: 0, label: 'Banaaneita 1kg' },
    { key: 1, label: 'Vessapaperia' }
  ]);

  const handleInput  = (text) => {
      const newChip = { key: shopItem.length, label: text};
      setShopItem([...shopItems, newChip]);
  };

  const handleDelete = chipToDelete => () => {
      setShopItem(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };
  const [text, setText] = React.useState('');

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

  const goToStep = (nextStep) => {
    setStep(nextStep);
  }

  if (submitted) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <Title>Luo avunpyyntö</Title>
      {step === 0 ? 
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

      <SubTitle>Avun tarvitsija</SubTitle>
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
      <Button onClick={() => goToStep(1)}>Seuraava</Button>
      </>
      : null }
      {step === 1 ? 
        <>
        <Button onClick={() => goToStep(0)}>Edellinen</Button>
        <Title>Ostoslista</Title>
        <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                handleInput(text);
                setText('');
            }
        }}
        />
        <SubTitle>Ostokset</SubTitle>
        {shopItem.map(data => {
            return (
            <Chip
            key={data.key}
            label={data.label}
            onDelete={handleDelete(data)}
            variant="outlined"
            color="primary"
            />
        );
      })}
      <Button onClick={submitRequest}>Lähetä avun tarve ilmoitus</Button>
    </>
      : null}
    </>
  );
};

export default NewTask;
