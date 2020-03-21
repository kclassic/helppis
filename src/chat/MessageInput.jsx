import React, { useState } from 'react';
import { Input, IconButton, InputAdornment } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(_ => ({
    inputField: {
        paddingTop: '30px',
        width: '100%',
    }
}));

const MessageInput = (props) => {
    const classes = useStyles();

    const [text, setText] = useState('');

    const submit = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            props.callBack(text);
            setText('');
        }
    }    

    return (
        <Input 
        className={classes.inputField}
        onChange={(e) => setText(e.target.value)} 
        value={text} 
        onKeyDown={(e) => submit(e)} 
        endAdornment={
            <InputAdornment position="end">
                <IconButton 
                onClick={() => {
                    props.callBack(text); 
                    setText('');}
                    }>
                    <SendIcon />
                </IconButton>
            </InputAdornment>}
        />);
}

export default MessageInput;
