import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function StaticsCard() {
  return (
    <Card
      sx={{
        width: "100%", // Ensures the card takes the full width of its container
        borderRadius: 1, // Rounded corners
        boxShadow: "0 2px 6px rgba(0, 0, 0, .1)",
        p: 1, // Padding inside the card
        overflow: "hidden", // Prevents overflow
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2" sx={{ flex: 1, textAlign: "left" }}>
            Income
          </Typography>
          <Typography variant="body2" sx={{ flex: 1, textAlign: "right" }}>
            This month
          </Typography>
        </Box>
        <Typography
          variant="h5"
          component="div"
          sx={{ overflow: "hidden", textOverflow: "ellipsis", fontWeight: 700 }}
        >
          ETB 9460.00
          <small>
            <ArrowDownwardIcon sx={{ fontSize: 15, color: "red", fontWeight: 500 }} />
          </small>
          <span style={{ fontSize: 16, color: "red" }}>15%</span>
        </Typography>
        <Typography
          variant="body2"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          <small>Compared to ETB 8994 last month</small>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="body2"
            sx={{ flex: 1, textAlign: "left", fontWeight: 700 }}
          >
            <small>Last month income</small>
          </Typography>
          <Typography
            variant="body2"
            sx={{ flex: 1, textAlign: "right", fontWeight: 700, color: "#333" }}
          >
            ETB 25600.00
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
