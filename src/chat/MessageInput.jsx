import React, { useState } from 'react';
import { Input, IconButton, InputAdornment } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const submit = (event, callBack, text) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        callBack(text);
    }
}

const MessageInput = (props) => {
    const [text, setText] = useState('');

    return (
        <Input 
        onChange={(e) => setText(e.target.value)} 
        value={text} 
        onKeyDown={(e) => submit(e, props.callBack, text)} 
        endAdornment={
            <InputAdornment position="end">
                <IconButton onClick={() => props.callBack(text)}>
                    <SendIcon />
                </IconButton>
            </InputAdornment>}
        />);
}

export default MessageInput;
