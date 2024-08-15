import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import RegisterPageWrapper from "../components/RegisterPageWrapper";
import { useSignIn } from "./useSignIn";

const Login = () => {
  const { login, rememberMe, setRememberMe, loading, error } = useSignIn();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
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
          <Typography variant="h6" gutterBottom>
            Login
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
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Sign In"}
          </Button>
          <Typography
            variant="body2"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            Haven't got an account?{" "}
            <a href="/register" style={{ color: "#1565c0" }}>
              Sign up
            </a>
          </Typography>
        </Box>
      </Box>
    </RegisterPageWrapper>
  );
};

export default Login;
