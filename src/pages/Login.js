import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { z } from "zod";
import { loginSchema } from "../utils/validationSchema";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../contexts/UserContext";
import { useAxios } from "../contexts/AxiosContext";
import RegisterPageWrapper from "../components/RegisterPageWrapper";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const axios = useAxios();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);

      const response = await axios.post("/users/login", formData);

      const token = response.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);

      console.log("Logged in and authenticated:", decodedToken);
      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      } else if (error.response) {
        console.error("Login error:", error.response.data);
      } else if (error.request) {
        console.error("Network error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <RegisterPageWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          padding: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            sx={{ backgroundColor: "#fff" }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ backgroundColor: "#fff" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: 1.5 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </RegisterPageWrapper>
  );
};

export default Login;
