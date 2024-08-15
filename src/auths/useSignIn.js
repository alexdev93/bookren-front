// src/features/auth/hooks/useLogin.js
import { useState } from "react";
import { loginSchema } from "../utils/validationSchema";
import { jwtDecode } from "jwt-decode";
import { useNotification } from "../Notification";
import { z } from "zod";
import { loginApi } from "../api";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const login = async (formData) => {
    setLoading(true);
    setError({});

    try {
      loginSchema.parse(formData);
      const { token } = await loginApi(formData);

      if (token) {
        showNotification("Login successful!", "success");
        const decodedToken = jwtDecode(token);
        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(decodedToken));
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(decodedToken));
        }
        navigate("/");
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleErrors = (error) => {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setError(fieldErrors);
      showNotification(
        "Validation error occurred. Please check the fields.",
        "error"
      );
    } else if (error.response && error.response.status) {
      const message =
        error.response.data && error.response.data.message
          ? error.response.data.message
          : "Unknown server error";
      showNotification("Login failed: " + message, "error");
    } else if (error.request) {
      showNotification("Network error: " + error.message, "error");
    } else {
      showNotification(
        "An unexpected error occurred: " + (error.message || "Unknown error"),
        "error"
      );
    }
  };

  return { login, loading, error, rememberMe, setRememberMe };
};
