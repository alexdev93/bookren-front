import React from "react";
import ProtectedComponent from "../components/ProtectedComponent";

const CommonPage = () => {
  return (
    // <ProtectedComponent subject="CommonPage">
      <div>
        <h1>Common Page</h1>
        <p>Welcome to the common page accessible by all roles!</p>
      </div>
    // </ProtectedComponent>
  );
};

export default CommonPage;
