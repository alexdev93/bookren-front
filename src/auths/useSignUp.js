// src/features/auth/hooks/useLogin.js
import { useState } from "react";
import { useNotification } from "../Notification";
import { z } from "zod";
import { registrationSchema } from "../utils/validationSchema";
import { registerApi } from "../api";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  //   const [termsAndCondition, setTermsAndCondition] = useState(false);
  const navigate = useNavigate();

  const signup = async (formData) => {
    setLoading(true);
    setError({});

    try {
      registrationSchema.parse(formData);
      await registerApi(formData).then(() => {
        showNotification("User Sign up", "success");
        navigate("/login");
      });
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleErrors = (error) => {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      showNotification(
        "Validation error occurred. Please check the fields.",
        "error"
      );
      const fieldErrors = error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setError(fieldErrors);
    } else if (error.response) {
      // Ensure error.response.data exists before accessing properties
      const message = error.response.data?.message || "Unknown server error";
      showNotification(`Registration failed: ${message}`, "error");
      console.error("Registration error:", error.response.data);
    } else if (error.request) {
      showNotification("Network error: " + error.message, "error");
      console.error("Network error:", error.message);
    } else {
      showNotification(
        "An unexpected error occurred: " + error.message,
        "error"
      );
      console.error("Error:", error.message);
    }
  };

  return { signup, loading, error };
};
