import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./auths/Register";
import Login from "./auths/Login";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Owners from "./pages/Owners";
import BookUpload from "./pages/BooksUpload";
import Books from "./pages/Books";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/books"
              element={
                <Sidebar>
                  <ProtectedRoute>
                    <Books />
                  </ProtectedRoute>
                </Sidebar>
              }
            />
            <Route
              path="/bookupload"
              element={
                <Sidebar>
                  <ProtectedRoute>
                    <BookUpload />
                  </ProtectedRoute>
                </Sidebar>
              }
            />
            <Route
              path="/owners"
              element={
                <Sidebar>
                  <ProtectedRoute>
                    <Owners />
                  </ProtectedRoute>
                </Sidebar>
              }
            />
          </Routes>
        </ErrorBoundary>
      </Router>
  );
};

export default App;
