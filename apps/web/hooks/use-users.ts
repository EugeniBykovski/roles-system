"use client";

import { apiGetUsers } from "@/lib/api/api";
import { User } from "@/types/user-types";
import useSWR from "swr";

export function useUsers(roleId?: string) {
  const key = roleId ? ["/users", roleId] : ["/users"];
  const { data, error, isLoading, mutate, isValidating } = useSWR<User[]>(
    key,
    ([, rid] = [] as any) => apiGetUsers(rid),
    { revalidateOnFocus: false }
  );

  return { users: data ?? [], error, isLoading, isValidating, mutate };
}
