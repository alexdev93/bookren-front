import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
