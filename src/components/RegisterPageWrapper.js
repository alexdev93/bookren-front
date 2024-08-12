import React from 'react';
import { Box, ImageListItem } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const RegisterPageWrapper = ({ children}) => {
    return (
      <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
        {/* Left Half */}
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#171b36",
            borderRight: "1px solid #ddd",
          }}
        >
          <AutoStoriesIcon sx={{ fontSize: "300px", color: "#fff" }} />
        </Box>

        {/* Right Half */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    );
};

export default RegisterPageWrapper;
