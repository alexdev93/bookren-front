import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { useAxios } from "../contexts/AxiosContext";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const axios = useAxios()

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    console.log(token)

    if (!token) {
      console.log("No token found in sessionStorage");
      return false;
    }

    try {
      const response = await axios.post(`/auths/verify`);

      // Axios does not have response.ok like fetch; check for status instead
      if (response.status !== 200) {
        console.log("Response sttatus - ", response.status);
      }

      const data = response.data;
      if (data) {
        return true;
      } else {
        console.log("Token verification response invalid");
      }
    } catch (err) {
      console.error("Token verification error:", err);
      localStorage.removeItem("token");
      return false;
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAuth();
        setIsAuthenticated(result);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    // Show the loading spinner while checking authentication
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

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
