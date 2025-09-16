"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check, Loader2, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Roles } from "@/types/user-types";

export function RolesMultiSelect({
  options = [],
  value = [],
  onChange,
  disabled,
}: {
  options?: Roles[];
  value?: Roles[];
  onChange: (v: Roles[]) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const selectedIds = useMemo(() => new Set(value.map((r) => r.id)), [value]);

  const toggle = (role: Roles) => {
    const exists = selectedIds.has(role.id);
    const next = exists
      ? value.filter((r) => r.id !== role.id)
      : [...value, role];
    onChange(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className="min-w-[220px] justify-between bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white cursor-pointer"
        >
          {value.length ? `${value.length} selected` : "Manage roles"}
          {disabled ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-70" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-auto p-0 bg-zinc-900 border-none text-white min-w-80 mt-2"
      >
        <Command className="bg-white">
          <CommandInput placeholder="Search role..." />
          <CommandList>
            <CommandEmpty className="text-zinc-800">No roles.</CommandEmpty>
            <ScrollArea className="max-h-64">
              <CommandGroup>
                {options.map((option) => {
                  const checked = selectedIds.has(option.id);

                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => toggle(option)}
                      className="cursor-pointer text-zinc-800"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggle(option)}
                        className="mr-2 bg-white"
                      />
                      <span className={cn(checked && "text-zinc-800")}>
                        {option.name}
                      </span>
                      {checked && (
                        <CheckCheck className="ml-auto h-4 w-4 text-green-400" />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
