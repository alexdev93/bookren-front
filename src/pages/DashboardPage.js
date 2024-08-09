import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import BookStatus from "../components/BookStatus";
import BookStatsPieChart from "../components/BookStatsPieChart";
import EarningSummaryChart from "../components/EarningSummaryChart";
import Sidebar from "../components/Sidebar";
import { useUser } from "../contexts/UserContext";

const DashboardPage = () => {
  const {user} = useUser();
  return (
    <Sidebar>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: 1, }}>
        <Grid container spacing={1} sx={{ flexGrow: 1 }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                height: 50,
                boxShadow: "0 3px 10px rgba(0, 0, 0, .2)",
                borderRadius: 1,
                p: 0.5,
              }}
            >
              <Typography ml={5}>{user.role}/Dashboard</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Paper sx={{ height: "100%", padding: 1, borderRadius: 1 }}>
              <BookStatsPieChart />
            </Paper>
          </Grid>


          <Grid item xs={12} sm={9}>
            <Grid container spacing={1} direction="column" sx={{ height: "100%" }}>

              <Grid item>
                <Paper sx={{ padding: 1, borderRadius: 1 }}>
                  <BookStatus />
                </Paper>
              </Grid>

              <Grid item xs>
                <Paper sx={{ padding: 1, borderRadius: 1, height: "100%" }}>
                  <EarningSummaryChart />
                </Paper>
              </Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Sidebar>
  );
};

export default DashboardPage;
