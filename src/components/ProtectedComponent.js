import React from "react";
import { useAbility } from "../contexts/AbilityContext";
import { ForbiddenError } from "@casl/ability";
import AccessDenied from "./AccessDenied";

const ProtectedComponent = ({ children, subject }) => {
  const ability = useAbility();

  try {
    ForbiddenError.from(ability).throwUnlessCan("view", subject);
    return <>{children}</>;
  } catch (error) {
    return <AccessDenied />;
  }
};

export default ProtectedComponent;
