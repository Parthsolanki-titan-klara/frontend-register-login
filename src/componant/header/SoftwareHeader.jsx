
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearTokens } from '../slices/authSlice';
import { Avatar, IconButton, Menu, Tooltip } from '@mui/material';

// ----------------------------------------------START----------------------------------------------

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard'];

function SoftwareHeader() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearTokens({ accessToken: null, refreshToken: null }));
        navigate('/');
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                }}
            >
                <Toolbar
                    variant="regular"
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        // borderRadius: '999px',
                        bgcolor:
                            theme.palette.mode === 'light'
                                ? 'rgba(255, 255, 255, 0.4)'
                                : 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    })}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            ml: '-18px',
                            px: 0,
                        }}
                    >
                        <img
                            src={
                                'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                            }
                            style={logoStyle}
                            alt="logo of sitemark"
                        />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <MenuItem
                                onClick={() => scrollToSection('features')}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    Features
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => scrollToSection('testimonials')}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    Testimonials
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => scrollToSection('highlights')}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    Highlights
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => scrollToSection('pricing')}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    Pricing
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => scrollToSection('faq')}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    FAQ
                                </Typography>
                            </MenuItem>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 0.5,
                            alignItems: 'center',
                        }}
                    >

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Parth Solanki" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}

                                <Divider />

                                <Button
                                    color="primary"
                                    variant="contained"
                                    sx={{ width: '100%' }}
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </Button>


                            </Menu>
                        </Box>
                    </Box>
                    <Box sx={{ display: { sm: '', md: 'none' } }}>
                        <Button
                            variant="text"
                            color="primary"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ minWidth: '30px', p: '4px' }}
                        >
                            <MenuIcon />
                        </Button>
                        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                            <Box
                                sx={{
                                    minWidth: '60dvw',
                                    p: 2,
                                    backgroundColor: 'background.paper',
                                    flexGrow: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'end',
                                        flexGrow: 1,
                                    }}
                                >
                                </Box>
                                <img src="https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg" style={logoStyle} alt="logo of sitemark" />
                                <MenuItem onClick={() => scrollToSection('features')}>
                                    Features
                                </MenuItem>
                                <MenuItem onClick={() => scrollToSection('testimonials')}>
                                    Testimonials
                                </MenuItem>
                                <MenuItem onClick={() => scrollToSection('highlights')}>
                                    Highlights
                                </MenuItem>
                                <MenuItem onClick={() => scrollToSection('pricing')}>
                                    Pricing
                                </MenuItem>
                                <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                                <Divider />
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                                <Divider />
                                <MenuItem>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        sx={{ width: '100%' }}
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}

// -----------------------------------------------------END--------------------------------------------

export default SoftwareHeader;