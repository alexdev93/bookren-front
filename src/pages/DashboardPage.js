import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import BookStatus from "../components/BookStatus";
import BookStatsPieChart from "../components/BookStatsPieChart";
import EarningSummaryChart from "../components/EarningSummaryChart";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", padding: 1 }}>
      <Grid container spacing={1} sx={{ height: "100%" }}>
        <Grid item xs={12} sm={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Paper
            sx={{
              height: 50,
              boxShadow: "0 3px 10px rgba(0, 0, 0, .2)",
              borderRadius: 1,
              p: 2,
            }}
          >
            Admin/Dashboard
          </Paper>
          <Grid container spacing={0.5}>
            <Grid item xs={12} sm={3.2}>
              <Paper sx={{ height: "100%", padding: 1, borderRadius: 1 }}>
                <BookStatsPieChart />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={8.5}>
              <Grid container spacing={1} direction="column">
                <Grid item>
                  <Paper sx={{ padding: 1, borderRadius: 1 }}>
                    <BookStatus />
                  </Paper>
                </Grid>

                <Grid item xs>
                  <Paper sx={{ padding: 1, borderRadius: 1 }}>
                    <EarningSummaryChart />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
