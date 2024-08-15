import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Toolbar,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

const drawerWidth = 240;

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { user } = state;

  if (!user) {
    console.log("user is null or undefined ");
    return;
  }

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <HomeIcon sx={{ color: "#45495e" }} />,
      roles: ["admin", "owner"],
      route: "/",
    },
    {
      text: "Book Upload",
      icon: <InfoIcon sx={{ color: "#45495e" }} />,
      roles: ["owner"],
      route: "/bookupload",
    },
    {
      text: "Books",
      icon: <InfoIcon sx={{ color: "#45495e" }} />,
      roles: ["admin"],
      route: "/books",
    },
    {
      text: "Owners",
      icon: <InfoIcon sx={{ color: "#45495e" }} />,
      roles: ["admin"],
      route: "/owners",
    },
    {
      text: "Other",
      icon: <ContactMailIcon sx={{ color: "#45495e" }} />,
      roles: ["admin", "owner"],
      route: "/",
    },
  ];

  const otherItems = [
    { text: "Notification", icon: <HomeIcon sx={{ color: "#45495e" }} /> },
    { text: "Settings", icon: <InfoIcon sx={{ color: "#45495e" }} /> },
    {
      text: "Login as owner",
      icon: <ContactMailIcon sx={{ color: "#45495e" }} />,
    },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(user.role)
  );

  console.log(filteredItems);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          top: 0,
          display: "flex",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: open ? "#fff" : "#000" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Box>

      {/* Responsive Persistent Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#171b36",
            color: "#fff",
            width: open ? drawerWidth : 0,
            boxSizing: "border-box",
            borderRadius: 5,
            m: 1,
            overflowX: "hidden",
            transition: "width 0.3s ease",
            "& .MuiBox-root": {
              p: 1,
              mt: 5,
            },
          },
        }}
      >
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <List>
            {filteredItems.map((item, index) => (
              <ListItem button key={index} onClick={() => navigate(item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#fff" }} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ flexGrow: 1 }}>
            {otherItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#45495e" }} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            sx={{
              mt: "auto",
              alignSelf: "center",
              fontWeight: 600,
              width: "80%",
              mb: 3,
              backgroundColor: "#45495e",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : 0,
          width: "100%",
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          transition: "margin-left 0.3s ease",
          overflowX: "hidden",
          p: 2,
        }}
      >
        {typeof children === "function"
          ? children({ isDrawerOpen: open })
          : children}
      </Box>
    </Box>
  );
};

export default Sidebar;
