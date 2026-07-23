import { User } from '@supabase/supabase-js';

export type Role = 'ADMIN' | 'MANAGER' | 'STAFF' | 'USER';

/**
 * Parses the role from the user's app_metadata.
 * Defaults to 'USER' if no specific role is assigned.
 */
export function getUserRole(user: User | null): Role {
  if (!user) return 'USER';
  
  // Supabase app_metadata is populated in the JWT token
  const role = user.app_metadata?.role;
  
  if (role === 'admin') return 'ADMIN';
  if (role === 'manager') return 'MANAGER';
  if (role === 'staff') return 'STAFF';
  
  return 'USER';
}

/**
 * Checks if a user has at least the required role.
 * Hierarchy: ADMIN > MANAGER > STAFF > USER
 */
export function hasRole(user: User | null, requiredRole: Role): boolean {
  const role = getUserRole(user);
  
  const hierarchy: Record<Role, number> = {
    'ADMIN': 4,
    'MANAGER': 3,
    'STAFF': 2,
    'USER': 1,
  };

  return hierarchy[role] >= hierarchy[requiredRole];
}

/**
 * Helper to be used in Server Actions to ensure authorization.
 * Throws an error if the user is not authorized.
 */
export function requireRole(user: User | null, requiredRole: Role) {
  if (!user) {
    throw new Error('Unauthorized: You must be logged in.');
  }
  
  if (!hasRole(user, requiredRole)) {
    throw new Error(`Forbidden: Requires ${requiredRole} privileges.`);
  }
}
