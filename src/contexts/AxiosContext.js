import React, { createContext, useContext } from "react";
import axiosInstance from "../axiosInstance";

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => (
  <AxiosContext.Provider value={axiosInstance}>
    {children}
  </AxiosContext.Provider>
);

export const useAxios = () => useContext(AxiosContext);
