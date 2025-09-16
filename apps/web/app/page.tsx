"use client";

import { Namespaces } from "@/lib/i18n";
import { Footer, Header } from "@/sections";
import { useTranslation } from "react-i18next";

export default function SystemPage() {
  const { t } = useTranslation(Namespaces.app);

  return (
    <div className="flex flex-col flex-1 w-full">
      <Header />
      <main
        className="flex-1 p-4 w-full flex-col 2xl:flex-row flex items-start justify-between"
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
          <div className="flex flex-col 2xl:flex-row justify-between items-start gap-8 my-12">
            <div className="2xl:w-[50%] md:w-[100%] sm:w-[100%] 2xl:h-[500px] justify-between flex flex-col">
              ROLES {t("title")}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
