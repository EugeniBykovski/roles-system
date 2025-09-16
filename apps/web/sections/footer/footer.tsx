"use client";

import { FC } from "react";
import { Clock4 } from "lucide-react";

export const Footer: FC = () => {
  return (
    <footer className="flex items-center justify-center p-8 bg-transparent rounded-t-lg">
      <div className="p-4 rounded-lg bg-white/3 fixed bottom-5 backdrop-blur-2xl flex justify-center items-center gap-2 shadow-lg shadow-zinc-800">
        <h3 className="text-xs font-bold text-[#fcffa8] tracking-widest">
          Roles System
        </h3>
        <div>
          <Clock4 className="w-4 h-4 text-[#fcffa8]" />
        </div>
      </div>
    </footer>
  );
};
