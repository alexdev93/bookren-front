import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import BooksTable from "../components/BooksTable";
import { useUser } from "../contexts/UserContext";
import { BooksProvider } from "../contexts/BooksContext";

const Dashboard = () => {
  // const { user } = useUser();
  // console.log(user.role)
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <BooksProvider>
        <BooksTable />
      </BooksProvider>
    </Container>
  );
};

export default Dashboard;
