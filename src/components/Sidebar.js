import React from "react";
import {
  Grid,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <Paper sx={{ minHeight: "100vh", p: 1, borderRadius: 2, ml: 0 }}>
      <Grid container spacing={2} direction={"column"}>
        <Grid item>svsdvs</Grid>
        <Grid item></Grid>
        <Grid item>
          <Box sx={{ padding: 1 }}>
            <Divider />
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Sidebar;
