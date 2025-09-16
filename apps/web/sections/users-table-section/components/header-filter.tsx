"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Roles } from "@/types/user-types";

export function HeaderFilter({
  roles,
  value,
  onChange,
  title = "Users",
}: {
  roles: Roles[];
  value: string;
  onChange: (v: string) => void;
  title?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>

      <div className="flex items-center gap-2">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-[220px] bg-zinc-900 border-zinc-800 text-white">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
            <SelectItem value="ALL">All roles</SelectItem>
            {roles.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
