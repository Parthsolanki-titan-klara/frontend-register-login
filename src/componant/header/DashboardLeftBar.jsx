
import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Avatar, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, Tooltip } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useMediaQuery } from '@mui/material';


// ----------------------------------------------START----------------------------------------------

function DashboardLeftBar() {

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <div>
            <AppBar
                position="fixed"
                style={{
                    width: isSmallScreen ? '100%' : '200px',
                    height: isSmallScreen ? 'auto' : '100vh',
                    top: isSmallScreen ? '0' : '64px',
                    left: '0',
                    backgroundColor: 'rgba(63, 81, 181, 0.5)',
                }}
                sx={{
                    boxShadow: 4,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                }}
            >
                <Toolbar style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} style={{ color: 'GrayText' }} />
                            </ListItem>
                        ))}
                    </List>
                </Toolbar>
            </AppBar>
            <main style={{ marginLeft: '200px', padding: '16px', flexGrow: 1 }}>
                {/* Other content goes here */}
            </main>
        </div>
    );
}

// -----------------------------------------------------END--------------------------------------------

export default DashboardLeftBar;