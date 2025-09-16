"use client";

import { apiPatchUserRoles } from "@/lib/api/api";
import { UpdateArgs, User } from "@/types/user-types";
import useSWRMutation from "swr/mutation";

export function useUpdateUserRoles() {
  const { trigger, isMutating, error } = useSWRMutation<
    User,
    any,
    string,
    UpdateArgs
  >("/users/:id/roles", async (_key, { arg }) => {
    return apiPatchUserRoles(arg.userId, arg.roleIds);
  });
  return { updateUserRoles: trigger, isMutating, error };
}
