import React from "react";
import ProtectedComponent from "../components/ProtectedComponent";

const AdminPage = () => {
  return (
    <ProtectedComponent subject="AdminPage">
      <div>
        <h1>Admin Page</h1>
        <p>Welcome, Admin!</p>
      </div>
    </ProtectedComponent>
  );
};

export default AdminPage;
