import { BE_Role, BE_User, User } from "@/types/user-types";
import { createInstance } from "../api-instance";

export const apiGetRoles = () =>
  createInstance<BE_Role[]>({ method: "GET", url: "/roles" });

export const apiGetUsers = (roleId?: string) =>
  createInstance<BE_User[]>({
    method: "GET",
    url: "/users",
    params: roleId ? { roleId } : undefined,
  }).then((arr) => arr.map((u) => ({ ...u, role: u.roles }) as User));

export const apiPatchUserRoles = (userId: string, roleIds: string[]) =>
  createInstance<BE_User>({
    method: "PATCH",
    url: `/users/${userId}/roles`,
    data: { roleIds },
  }).then((u) => ({ ...u, role: u.roles }) as User);
