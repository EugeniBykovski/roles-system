"use client";

import { FC } from "react";
import Link from "next/link";
import { ScanQrCode } from "lucide-react";

export const Header: FC = () => {
  return (
    <header className="bg-zinc-800 text-white p-4 flex items-center shadow-2xl shadow-zinc-800 justify-between sticky top-0 z-10">
      <div>
        <Link href="/">
          <ScanQrCode className="w-8 h-8 text-[#fcffa8] cursor-pointer" />
        </Link>
      </div>
    </header>
  );
};
