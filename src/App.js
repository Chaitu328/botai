import React, { useState } from 'react';
import { Box, IconButton, Drawer, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatBot from './components/ChatBot';
import Sidebar from './components/Sidebar';
import data from './data.json';  // Import your data.json file

function App() {
    const [view, setView] = useState('chat'); // 'chat' or 'past'
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme(); // Get the theme object
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Use theme in useMediaQuery

    const handleViewChange = (newView) => {
        setView(newView);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {isMobile ? (
                <>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        sx={{ position: 'absolute', top: 16, left: 16 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={handleDrawerToggle}
                    >
                        <Sidebar onViewChange={handleViewChange} />
                    </Drawer>
                    <Box sx={{ flex: 1, ml: 0 }}>
                        <ChatBot data={data} view={view} onViewChange={handleViewChange} />
                    </Box>
                </>
            ) : (
                <>
                    <Sidebar onViewChange={handleViewChange} />
                    <Box sx={{ flex: 1 }}>
                        <ChatBot data={data} view={view} onViewChange={handleViewChange} />
                    </Box>
                </>
            )}
        </Box>
    );
}

export default App;
