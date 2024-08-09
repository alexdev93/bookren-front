import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  Box,
  Toolbar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar = ({children}) => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'About', icon: <InfoIcon /> },
    { text: 'Contact', icon: <ContactMailIcon /> },
  ];
  const otherItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'About', icon: <InfoIcon /> },
    { text: 'Contact', icon: <ContactMailIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex'}}>
      <Box position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,  top: 0, display: "flex"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Box>

      {/* Persistent Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            '& .MuiBox-root': {
              p: 1,
              mt: 5,
            },
          
          },
        }}
        >
        <Divider />
        <Box sx={{display: "grid"}}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {otherItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : '0px', // Shift content when drawer is open
          transition: 'margin-left 0.3s ease', // Smooth transition
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
