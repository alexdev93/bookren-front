import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { CircularProgress, Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const { state } = useAppContext();
  const { user, setUserState } = state;

  if (!user) {
    const token = localStorage.getItem("token") || "";
    const decodedToken = jwtDecode(token);
    decodedToken
      ? setUserState(decodedToken)
      : console.log("there is not token");
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
