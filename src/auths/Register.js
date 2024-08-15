import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import RegisterPageWrapper from "../components/RegisterPageWrapper";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useSignUp } from "./useSignUp";

const Register = () => {
  const { signup, loading, error } =
    useSignUp();
  const options = countryList().getData();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    location: "",
    role: "owner",
  });


  const handleChange = (e) => {
    if (e.target) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        location: e.label,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
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
            error={!!error.username}
            helperText={error.username}
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
            error={!!error.password}
            helperText={error.password}
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
            error={!!error.email}
            helperText={error.email}
            sx={{ backgroundColor: "#fff" }}
          />
          <Select
            options={options}
            value={formData.location}
            onChange={handleChange}
          />
          {/* <FormControlLabel
            control={
              <Checkbox
                checked={}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="I accept the terms and conditions"
          /> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Sign Up"}
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
