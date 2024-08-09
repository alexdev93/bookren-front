import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider } from "./contexts/UserContext";
import { AbilityProvider } from "./contexts/AbilityContext";
import { AxiosProvider } from "./contexts/AxiosContext";
import ErrorBoundary from "./components/ErrorBoundary";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { BooksProvider } from "./contexts/BooksContext";

const App = () => {
  return (
    <AxiosProvider>
      <UserProvider>
        <BooksProvider>
          <AbilityProvider>
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
                </Routes>
              </ErrorBoundary>
            </Router>
          </AbilityProvider>
        </BooksProvider>
      </UserProvider>
    </AxiosProvider>
  );
};

export default App;
