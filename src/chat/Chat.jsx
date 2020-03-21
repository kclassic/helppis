import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import MessageInput from './MessageInput';

const useStyles = makeStyles(theme => ({
    container: {
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        fontWeight: theme.typography.fontWeightLight,
        bottom: 0,
    },
    bubbleContainer: {
        width: '100%',
        display: 'flex',
    },
    bubble: {
        borderRadius: '10px',
        margin: '5px',
        padding: '10px',
        display: 'inline-block',
        background: 'lightskyblue'
    },
    right: {
        justifyContent: 'flex-end',
    },
    left: {
        justifyContent: 'flex-start',
    }
}));

const dummyMessages = [
    { userId: '1', text:'moi, haen kanojasi tällä hetkellä :)'},
    { userId: '2', text:'moi, mahtavaa!'},
    { userId: '1', text:'tuon ne 15 minuutin päästä ja jätän ne ovelle ettet saa pahoja viruksia :)'},
];

const dummyResponses = [
    { userId: '2', text:'Voinko korvata tämän jotenkin?'},
    { userId: '2', text:'kiitos avusta!'},
    { userId: '2', text:'en malta odottaa!'},
]

const getDummyResponse = () => {
    if(dummyResponses.length > 1) {
        return dummyResponses.pop();
    }
    return dummyResponses[0];
}

const Chat = () => {
    const classes = useStyles();

    const [messages, setMessages] = useState(dummyMessages);

    const getDirection = (userId) => {
        if(userId === '1') {
            return classes.left;
        }
        return classes.right;
    }

    const addDummyResponse = (newMessages) => {
        const withResponse = newMessages.concat(getDummyResponse());
        setMessages(withResponse);
    }

    const print = (text) => {
        if(text.length > 0) {
            const newMessages = messages.concat({userId: '1', text: text});
            setMessages(newMessages);
            setTimeout(function () {
                addDummyResponse(newMessages);
           }, 1000);
        }
    }

    const chatBubbles = messages.map((message, idx) => {
        return (
            <div className={`${classes.bubbleContainer} ${getDirection(message.userId)}`} key={idx}>
                <div className={classes.bubble}>
                    <div className={classes.button}>{message.text}</div>
                </div>
            </div>);
    });

    return ( 
        <div className={classes.container}>
            <div>{chatBubbles}</div> 
            <MessageInput callBack={print} />
        </div>);
}

export default Chat;
