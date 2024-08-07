import { z } from "zod";

export const registrationSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  location: z.string().min(1, "Location is required"),
  role: z.enum(["admin", "owner"]),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(3, "Password must be at least 6 characters long"),
});