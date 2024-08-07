import React from "react";
import { Typography, Container } from "@mui/material";
import { BooksProvider } from "../contexts/BooksContext";
import BookStatus from "../components/BookStatus";

const DashboardPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <BooksProvider>
        <BookStatus />
      </BooksProvider>
    </Container>
  );
};

export default DashboardPage;
