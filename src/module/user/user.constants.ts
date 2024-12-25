export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export type Role = keyof typeof USER_ROLE;
