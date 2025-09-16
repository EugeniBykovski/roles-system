"use client";

import { Badge } from "@/components/ui/badge";
import type { Roles } from "@/types/user-types";

export function RolesBadges({ roles }: { roles: Roles[] }) {
  if (!roles.length) return <span className="text-white/50">No roles</span>;

  return (
    <div className="flex flex-wrap gap-1">
      {roles.map(({ id, name }) => (
        <Badge
          key={id}
          variant="secondary"
          className="bg-zinc-800 text-white border-zinc-700"
        >
          {name}
        </Badge>
      ))}
    </div>
  );
}
