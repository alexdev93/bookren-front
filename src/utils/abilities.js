import { AbilityBuilder, Ability } from '@casl/ability';

export const defineAbilityFor = (role) => {
    return AbilityBuilder.define((can, cannot) => {
        if (role === 'admin') {
            can('manage', 'all');
        } else if (role === 'owner') {
            can('read', 'Book', { ownerId: { $eq: 'user-id' } });
            can('manage', 'Book', { ownerId: { $eq: 'user-id' } });
        } else {
            can('read', 'Book');
        }
    });
};

export const ability = defineAbilityFor('guest');
