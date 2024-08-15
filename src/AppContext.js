import React, { createContext, useContext, useReducer } from "react";
import { appReducer, initialState } from "./AppReduer";
import { useAxios } from "./Axios/index.js";
import { transactions } from "./transaction.js";

export const AppContext = createContext(initialState);
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const axios = useAxios();

  const getUserInfo = async () => {
    const userInfo = JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user")
    );
    console.log(userInfo, " user info from app context");
    dispatch({ type: "STORE_USER_INFO", payload: userInfo });
  };
  
  const fetchBooks = async () => {
    dispatch({ type: "FETCH_BOOKS_REQUEST" });
    try {
      const response = await axios.get(`/books`);
      dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch books:", error);
      dispatch({ type: "FETCH_BOOKS_FAILURE" });
    }
  };


  const getTransactions = async () => {
    try {
      // const response = await axios.get(`/transactions`);
      dispatch({
        type: "FETCH_TRANSACTIONS_SUCCESS",
        payload: transactions,
      });
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      dispatch({ type: "FETCH_TRANSACTIONS_FAILURE" });
    }
  };

  const getAbilities = async () => {
    try {
      const response = await axios.get(`/abilities`);
      dispatch({ type: "FETCH_ABILITIES_SUCCESS", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch abilities:", error);
      dispatch({ type: "FETCH_ABILITIES_FAILURE" });
    }
  };

  return (
    <AppContext.Provider
      value={{ state, getUserInfo, fetchBooks, getTransactions, getAbilities }}
    >
      {children}
    </AppContext.Provider>
  );
};
