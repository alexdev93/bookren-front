import React, {useEffect} from "react";
import { ForbiddenError } from "@casl/ability";
import AccessDenied from "./AccessDenied";
import { useAppContext } from "../AppContext";

const ProtectedComponent = ({ children, subject }) => {
   const { state, setUserAbilities } = useAppContext();
   const { ability } = state;

  try {
    ForbiddenError.from(ability).throwUnlessCan("view", subject);
    return <>{children}</>;
  } catch (error) {
    return <AccessDenied />;
  }
};

export default ProtectedComponent;
