import React, { createContext, useContext, useEffect, useState } from "react";
import { useAxios } from "../contexts/AxiosContext";
import { useUser } from "./UserContext";

const BooksContext = createContext();

export const BooksProvider = ({ children, role }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const { setUser } = useUser();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [role]);

  const addBook = async (newBook) => {
    try {
      const response = await axios.post("/api/books", newBook);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const editBook = async (updatedBook) => {
    try {
      await axios.put(`/api/books/${updatedBook.id}`, updatedBook);
      setBooks(
        books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const approveBook = async (bookId) => {
    try {
      const response = await axios.patch(`/books/${bookId}/approve`);
      console.log(response.data)
      setBooks(
        books.map((book) =>
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
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <BooksContext.Provider
      value={{ books, loading, addBook, editBook, deleteBook, approveBook }}
    >
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
