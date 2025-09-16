"use client";

import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 text-white/50 animate-spin" />
    </div>
  );
};
