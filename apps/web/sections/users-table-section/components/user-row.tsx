"use client";

import type { Roles, User } from "@/types/user-types";
import { TableCell, TableRow } from "@/components/ui/table";
import { RolesBadges } from "./roles-badges";
import { RolesMultiSelect } from "./roles-multi-select";

export function UserRow({
  user,
  allRoles,
  saving,
  onChangeRoles,
}: {
  user: User;
  allRoles: Roles[];
  saving: boolean;
  onChangeRoles: (roles: Roles[]) => void;
}) {
  return (
    <TableRow className="hover:bg-zinc-200 cursor-pointer">
      <TableCell className="text-zinc-800">{user.name}</TableCell>
      <TableCell className="text-zinc-800">{user.email}</TableCell>
      <TableCell>
        <RolesBadges roles={user.role ?? []} />
      </TableCell>
      <TableCell className="text-right">
        <RolesMultiSelect
          options={allRoles}
          value={user.role ?? []}
          onChange={onChangeRoles}
          disabled={saving}
        />
      </TableCell>
    </TableRow>
  );
}
