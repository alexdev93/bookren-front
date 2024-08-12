import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { state } = useAppContext();
  const { user } = state;

  if (!user) {
    console.log("in ProtectedRoute user is null")
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
