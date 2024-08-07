import React, { createContext, useContext, useState, useEffect } from "react";
import { Ability } from "@casl/ability";
import { defineAbilitiesFor } from "../utils/abilities";
import { useUser } from "./UserContext";

const AbilityContext = createContext(null);

export const AbilityProvider = ({ children }) => {
  const { user } = useUser();
  const [ability, setAbility] = useState(new Ability([]));

  useEffect(() => {
    if (user) {
      const newAbility = defineAbilitiesFor(user.role);
      setAbility(newAbility);
    }
  }, [user]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);
