"use client";

import { Footer, Header, UsersTableSection } from "@/sections";

export default function SystemPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <Header />
      <main
        className="flex-1 p-4 w-full flex items-center justify-between"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.05) 0px,
              rgba(255,255,255,0.05) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.05) 0px,
              rgba(255,255,255,0.05) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
          backgroundSize: "40px 40px",
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <UsersTableSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
