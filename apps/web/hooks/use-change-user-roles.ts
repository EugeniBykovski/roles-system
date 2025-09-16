"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import type { Roles, User } from "@/types/user-types";
import { useUpdateUserRoles } from "@/hooks";

export function useChangeUserRoles(
  mutate: (
    data?: any,
    opts?: {
      revalidate?: boolean;
    }
  ) => Promise<any>
) {
  const { updateUserRoles, isMutating } = useUpdateUserRoles();

  const changeRoles = useCallback(
    async (user: User, newRoles: Roles[]) => {
      await mutate(
        (prev: User[] | undefined) =>
          (prev ?? []).map((u) =>
            u.id === user.id ? { ...u, role: newRoles } : u
          ),
        { revalidate: false }
      );

      try {
        const updated = await updateUserRoles({
          userId: user.id,
          roleIds: newRoles.map((r) => r.id),
        });

        await mutate(
          (prev: User[] | undefined) =>
            (prev ?? []).map((u) =>
              u.id === user.id ? { ...u, role: updated.role } : u
            ),
          { revalidate: false }
        );

        toast.success(`Roles updated for ${user.name}`);
      } catch (e: any) {
        await mutate();

        toast.error("Update failed", {
          description: e?.data?.message || "Try again later",
        });
      }
    },

    [mutate, updateUserRoles]
  );

  return { changeRoles, isSaving: isMutating };
}
