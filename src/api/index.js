import axiosInstance from "./axiosInstance";

export const loginApi = async (credentials) => {
  const response = await axiosInstance.post("/users/login", credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data;
};

export const getUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const verifyToken = async () => {
  try {
    return await axiosInstance.post(`/auths/verify`);
  } catch (e) {
    console.log("token verification error");
  }
};
