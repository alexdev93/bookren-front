import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useAxios } from "./AxiosContext";
import { useUser } from "./UserContext";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchBooks = async () => {
      if (user) {
        try {
          const response = await axios.get("/transactions");
          setTransactions(response.data);
        } catch (error) {
          console.error("Error fetching transactions:", error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Transaction not fetched because of user not logged");
      }
    };

    fetchBooks();
  }, [user]);

  const value = useMemo(
    () => ({ transactions, loading, user }),
    [transactions, loading, user]
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("user transactions must be used within a TransactionProvider");
  }
  return context;
};
