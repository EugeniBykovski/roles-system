"use client";

import { apiGetRoles } from "@/lib/api/api";
import { Roles } from "@/types/user-types";
import useSWR from "swr";

export function useRoles() {
  const { data, error, isLoading, mutate } = useSWR<Roles[]>(
    "/roles",
    () => apiGetRoles(),
    { revalidateOnFocus: false }
  );

  return { roles: data ?? [], error, isLoading, mutate };
}
