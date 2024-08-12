import React from "react";
import { Typography, Box } from "@mui/material";

const Owners = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Owners
      </Typography>
      <Typography variant="body1">
        Here you can manage the book owners.
      </Typography>
      {/* Add your owners management code here */}
    </Box>
  );
};

export default Owners;
