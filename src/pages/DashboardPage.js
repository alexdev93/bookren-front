import React, { useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import BookStatus from "../components/BookStatus";

import EarningSummaryChart from "../components/EarningSummaryChart";

import Sidebar from "../components/Sidebar";
import { useAppContext } from "../AppContext";
import StaticsComponent from "../components/StaticsComponent";

const drawerWidth = 240;

const DashboardPage = () => {
  const { state, fetchBooks, getTransactions } = useAppContext();
  const { user } = state;

  // useEffect(() => {
  //   if (!user) {
  //     return;
  //   }

  //   console.log(user, "this isidn")
  //   fetchBooks();
  //   getTransactions();
  // }, [user]);

  return (
    <Sidebar>
      {({ isDrawerOpen }) => (
        <Box
          sx={{
            maxWidth: "100%",
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: 1,
            mr: 3
          }}
        >
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
                <Typography ml={5}><span style={{ fontSize: 30, fontWeight: 700}}>{user.role}</span>/Dashboard</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={isDrawerOpen ? 2.8 : 3}>
              <StaticsComponent />
            </Grid>

            <Grid
              item
              xs={12}
              md={isDrawerOpen ? 4 : 9}
              sx={{
                // marginLeft: isDrawerOpen ? `${drawerWidth}px` : "0px",
                transition: "margin-left 0.3s ease",
              }}
            >
              <Grid
                container
                spacing={1}
                direction="column"
                sx={{ height: "100%", mr: 5 }}
              >
                <Grid item>
                  <Paper sx={{ padding: 1, borderRadius: 1 }}>
                    <Box sx={{ m: 2 }}>
                      <BookStatus state={state} />
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs>
                  <Paper sx={{ padding: 1, borderRadius: 1 }}>
                    <EarningSummaryChart state={state} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Sidebar>
  );
};

export default DashboardPage;
