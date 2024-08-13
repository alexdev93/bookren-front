import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bookrent-back.onrender.com/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
    (error) => {
      console.log("request error: ", error)
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response.data)
    return response;
  },
  (error) => {
      if (error.response.status === 401) {
          console.log("unauthorized");
    }
    console.log(error.message)
    return Promise.reject(error);
  }
);

export default axiosInstance;
