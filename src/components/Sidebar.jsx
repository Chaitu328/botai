import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Sidebar = ({ onViewChange }) => {
    return (
        <Box sx={{ width: 250, bgcolor: '#E0E0E0', p: 2, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom>
                ChatBot
            </Typography>
            <Button fullWidth variant="contained" onClick={() => onViewChange('chat')} sx={{ mb: 1 }}>
                New Chat
            </Button>
            <Button fullWidth variant="outlined" onClick={() => onViewChange('past')}>
                Past Conversations
            </Button>
        </Box>
    );
};

export default Sidebar;
