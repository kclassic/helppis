import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

const messages = [
    { userId: '1', text:'moi, haen kanojasi tällä hetkellä :)'},
    { userId: '2', text:'moi, mahtavaa!'},
    { userId: '1', text:'tuon ne 15 minuutin päästä ja jätän ne ovelle ettet saa pahoja viruksia :)'},
];

const getDirection = (userId, classes) => {
    if(userId === '1') {
        return classes.left;
    }
    return classes.right;
}

const Chat = () => {
    const classes = useStyles();

    const chatBubbles = messages.map((message, i = 0) => {
        return (<div className={`${classes.bubbleContainer} ${getDirection(message.userId, classes)}`} key={i++}>
            <div key={i++} className={classes.bubble}>
                <div className={classes.button}>{message.text}</div>
            </div>
        </div>);
    });
    return <div className={classes.container}>{chatBubbles}</div>
}

export default Chat;
