import React from "react";
import { useAbility } from "../contexts/AbilityContext";
import { ForbiddenError } from "@casl/ability";

const ProtectedComponent = ({ children, subject }) => {
  const ability = useAbility();

  try {
    ForbiddenError.from(ability).throwUnlessCan("view", subject);
    return <>{children}</>;
  } catch (error) {
    return <div>You do not have permission to view this page</div>;
  }
};

export default ProtectedComponent;
