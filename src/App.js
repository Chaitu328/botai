import React, { useState } from 'react';
import { Box } from '@mui/material';
import ChatBot from './components/ChatBot';
import Sidebar from './components/Sidebar';
import data from './data.json';  // Import your data.json file

function App() {
    const [view, setView] = useState('chat'); // 'chat' or 'past'

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Sidebar onViewChange={handleViewChange} />
            <ChatBot data={data} view={view} onViewChange={handleViewChange} />
        </Box>
    );
}

export default App;
