import { AbilityBuilder, Ability } from "@casl/ability";

export const defineAbilitiesFor = (role) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch (role) {
    case "admin":
      can("view", "AdminPage");
      can("view", "OwnerPage");
      // can("view", "CommonPage");
      break;
    case "owner":
      can("view", "OwnerPage");
      // can("view", "CommonPage");
      cannot("view", "AdminPage");
      break;
    default:
      // can("view", "CommonPage");
      cannot("view", "AdminPage");
      cannot("view", "OwnerPage");
      break;
  }

  return build();
};
