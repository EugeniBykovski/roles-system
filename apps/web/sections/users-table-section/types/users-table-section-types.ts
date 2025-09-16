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
