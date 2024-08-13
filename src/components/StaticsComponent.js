import StaticsCard from "../components/StaticsCard";
import BookStatsPieChart from "../components/BookStatsPieChart";
import { Box, Paper, Typography } from "@mui/material";

const drawerWidth = 240;

const StaticsComponent = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "90vh",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflow: "hidden",
      }}
    >
      <Box p={2}>
        <Typography variant="h6">This month statistics</Typography>
        <Typography variant="body2">April 24 to May 02, 2021</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <StaticsCard />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <BookStatsPieChart state={{}} />
      </Box>
    </Paper>
  );
};

export default StaticsComponent;
