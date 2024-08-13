import React from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const RegisterPageWrapper = ({ children }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box sx={{ height: "100vh", width: "100vw", display: "flex" }}>
      <Grid container>
        {!isMobile && (
          <Grid item sm={0} md={6}>
            <Box
              sx={{
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
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegisterPageWrapper;
