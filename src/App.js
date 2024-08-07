import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CommonPage from "./pages/CommonPage";
import AdminPage from "./pages/AdminPage";
import OwnerPage from "./pages/OwnerPage";
import { UserProvider } from "./contexts/UserContext";
import { AbilityProvider } from "./contexts/AbilityContext";
import { AxiosProvider } from "./contexts/AxiosContext";
import ErrorBoundary from "./components/ErrorBoundary";
import  Dashboard  from "./pages/Dashboard";

const App = () => {
  return (
    <AxiosProvider>
      <UserProvider>
        <AbilityProvider>
          <Router>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<CommonPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/owner" element={<OwnerPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </ErrorBoundary>
          </Router>
        </AbilityProvider>
      </UserProvider>
    </AxiosProvider>
  );
};

export default App;
