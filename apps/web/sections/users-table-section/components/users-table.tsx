"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Roles, User } from "@/types/user-types";
import { UserRow } from "./user-row";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "@/components/ui/loader";

export function UsersTable({
  users,
  allRoles,
  saving,
  onChangeUserRoles,
  showSkeleton = false,
  showOverlay = false,
}: {
  users: User[];
  allRoles: Roles[];
  saving: boolean;
  onChangeUserRoles: (user: User, newRoles: Roles[]) => void;
  showSkeleton?: boolean;
  showOverlay?: boolean;
}) {
  return (
    <div className="relative rounded-xl border border-zinc-800 overflow-hidden min-h-[260px] bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-900/60 hover:bg-zinc-900/60">
            <TableHead className="text-white/70">Name</TableHead>
            <TableHead className="text-white/70">Email</TableHead>
            <TableHead className="text-white/70 w-[420px]">Roles</TableHead>
            <TableHead className="text-right text-white/70">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {showSkeleton ? (
            Array.from({ length: 2 }).map((_, i) => (
              <TableRow key={i} className="h-14">
                <TableCell>
                  <Skeleton className="h-5 w-40 bg-zinc-800" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-64 bg-zinc-800" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-48 bg-zinc-800" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-9 w-40 ml-auto bg-zinc-800" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {users.map((u) => (
                <UserRow
                  key={u.id}
                  user={u}
                  allRoles={allRoles}
                  saving={saving}
                  onChangeRoles={(roles) => onChangeUserRoles(u, roles)}
                />
              ))}
              {!users.length && (
                <TableRow className="h-20">
                  <TableCell colSpan={4} className="text-center text-zinc-800">
                    No users
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      {(showOverlay || saving) && <Loader />}
    </div>
  );
}
