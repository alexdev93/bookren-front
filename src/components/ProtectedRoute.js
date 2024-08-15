import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAppContext } from "../AppContext";
import { verifyToken } from "../api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { getUserInfo } = useAppContext();

  const checkAuth = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      console.log("No token found in sessionStorage");
      return false;
    }

    try {
      const response = await verifyToken();
      if (response.status === 200) {
        return true;
      } else {
        console.log("Response status - ", response.status);
        return false;
      }
    } catch (err) {
      console.error("Token verification error:", err);
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      return false;
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAuth();
      if (result) {
        getUserInfo(); // Only call this if authenticated
      }
      setIsAuthenticated(result);
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    console.log("Loading...");
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  console.log("isAuthenticated:", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
