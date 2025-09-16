"use client";

import { useState } from "react";
import {
  useChangeUserRoles,
  useRoles,
  useUpdateUserRoles,
  useUsers,
} from "@/hooks";
import type { Roles, User } from "@/types/user-types";
import { HeaderFilter } from "./components/header-filter";
import { UsersTable } from "./components/users-table";

export const UsersTableSection = () => {
  const [filterRoleId, setFilterRoleId] = useState<string>("ALL");

  const { roles, isLoading: rolesLoading } = useRoles();
  const {
    users,
    isLoading: usersLoading,
    isValidating,
    mutate,
  } = useUsers(filterRoleId === "ALL" ? undefined : filterRoleId);

  const { isMutating } = useUpdateUserRoles();
  const { changeRoles } = useChangeUserRoles(mutate);

  const showSkeleton = (usersLoading || rolesLoading) && users.length === 0;
  const showOverlay = (isValidating || rolesLoading) && users.length > 0;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <HeaderFilter
        roles={roles}
        value={filterRoleId}
        onChange={setFilterRoleId}
        title="Users"
      />
      <UsersTable
        users={users}
        allRoles={roles}
        saving={isMutating}
        showSkeleton={showSkeleton}
        showOverlay={showOverlay}
        onChangeUserRoles={(user: User, roles: Roles[]) =>
          changeRoles(user, roles)
        }
      />
    </div>
  );
};
