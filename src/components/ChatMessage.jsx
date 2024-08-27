import React from 'react';
import { ListItem, ListItemText, Paper, Box } from '@mui/material';

const ChatMessage = ({ message }) => {
    const isUser = message.type === 'user';

    return (
        <ListItem>
            <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', width: '100%' }}>
                <Paper sx={{
                    p: 2,
                    backgroundColor: isUser ? '#1976d2' : '#e0e0e0',
                    color: isUser ? '#fff' : '#000',
                    maxWidth: '80%'
                }}>
                    <ListItemText primary={message.text} />
                </Paper>
            </Box>
        </ListItem>
    );
};

export default ChatMessage;
