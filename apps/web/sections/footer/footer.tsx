"use client";

import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex items-center justify-center p-8 bg-transparent rounded-t-lg">
      <div className="p-4 rounded-lg bg-white/3 fixed bottom-5 backdrop-blur-2xl flex justify-center items-center gap-2 shadow-lg shadow-zinc-800">
        <h3 className="text-xs font-bold text-[#fcffa8] tracking-widest">
          Roles System
        </h3>
      </div>
    </footer>
  );
};
