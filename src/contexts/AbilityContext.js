import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
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
    } else {
      setAbility(new Ability([]));
    }
  }, []);

  const value = useMemo(() => ability, [ability]);

  return (
    <AbilityContext.Provider value={value}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);
