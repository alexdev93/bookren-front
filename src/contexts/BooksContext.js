import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAxios } from "./AxiosContext";
import { useUser } from "./UserContext";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const { user } = useUser();

  useEffect(() => {
    const fetchBooks = async () => {
      if(user){
        try {
          const response = await axios.get("/books");
          setBooks(response.data);
        } catch (error) {
          console.error("Error fetching books:", error.message);
        } finally {
          setLoading(false);
        }
      }
      else {
        console.log("Books not fetched because of user not logged")
      }
    };

    fetchBooks();
  }, [user]);

  const addBook = async (newBook) => {
    try {
      const response = await axios.post("/api/books", newBook);
      setBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const editBook = async (updatedBook) => {
    try {
      await axios.put(`/api/books/${updatedBook.id}`, updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const approveBook = async (bookId) => {
    try {
      const response = await axios.patch(`/books/${bookId}/approve`);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, isApproved: true } : book
        )
      );
    } catch (error) {
      console.error("Error approving book:", error.message);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`/api/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const value = useMemo(() => ({
    books,
    loading,
    addBook,
    editBook,
    deleteBook,
    approveBook
  }), [books, loading]);

  return (
    <BooksContext.Provider value={value}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
