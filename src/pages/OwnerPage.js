import React from "react";
import ProtectedComponent from "../components/ProtectedComponent";

const OwnerPage = () => {
  return (
    <ProtectedComponent subject="OwnerPage">
      <div>
        <h1>Owner Page</h1>
        <p>Welcome, Owner!</p>
      </div>
    </ProtectedComponent>
  );
};

export default OwnerPage;
