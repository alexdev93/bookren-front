import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { z } from "zod";
import { registrationSchema } from "../utils/validationSchema";
import { jwtDecode } from "jwt-decode";
import RegisterPageWrapper from "../components/RegisterPageWrapper";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { registerApi } from "../api";

const Register = () => {
  const [rememberMe, setRememberMe] = useState();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    location: "",
    role: "owner",
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
      registrationSchema.parse(formData);

      const { token } = await registerApi(formData);
      localStorage.setItem("token", token);
      const decodedToken = await jwtDecode(token);
      console.log("Registered and authenticated:", decodedToken);
      Navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      } else if (error.response) {
        console.error("Registration error:", error.response.data);
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
        <Box sx={{ width: "100%", ml: 31, display: "grid", gap: 3, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AutoStoriesIcon sx={{ fontSize: 30, color: "#1565c0" }} />
            <Typography variant="h5">Book Rent</Typography>
          </Box>
          <Typography variant="body" gutterBottom>
            Sign up as owner
          </Typography>
        </Box>
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
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ backgroundColor: "#fff" }}
          />
          <TextField
            label="Phone Number"
            name="Phone Number"
            variant="outlined"
            fullWidth
            value={formData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
            sx={{ backgroundColor: "#fff" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="I accept the terms and conditions"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: 1 }}
          >
            Register
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            Already have an account?{" "}
            <a href="/login" style={{ color: "#1565c0" }}>
              Sign in
            </a>
          </Typography>
        </Box>
      </Box>
    </RegisterPageWrapper>
  );
};

export default Register;
