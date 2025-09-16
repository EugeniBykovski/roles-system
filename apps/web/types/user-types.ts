export type Roles = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Roles[];
};

export type UpdateArgs = {
  userId: string;
  roleIds: string[];
};

export type BE_Role = Roles;

export type BE_User = {
  id: string;
  name: string;
  email: string;
  roles: Roles[];
};
