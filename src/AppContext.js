import React, { createContext, useContext, useReducer } from "react";
import { appReducer, initialState } from "./AppReduer";
import { useAxios } from "./contexts/AxiosContext";
import {transactions} from './transaction.js'

export const AppContext = createContext(initialState);
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const axios = useAxios();

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


  const setUserState = (userInfo) => {
    try {
      localStorage.setItem("user", JSON.stringify(userInfo));
      dispatch({ type: "FETCH_USER_INFO_SUCCESS", payload: userInfo });
    } catch (error) {
      console.error("Failed to set user info:", error);
      dispatch({ type: "FETCH_USER_INFO_FAILURE" });
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
      value={{ state, fetchBooks, setUserState, getTransactions, getAbilities }}
    >
      {children}
    </AppContext.Provider>
  );
};
