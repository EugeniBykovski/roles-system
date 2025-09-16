import type { Metadata } from "next";
import "./globals.css";
import I18nProvider from "@/providers/i18n-provider/i18n-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Roles System",
  description: "Roles System Application",
  icons: {
    icon: "/img/logo.svg",
    shortcut: "/img/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-[#2c3030] text-white min-h-screen flex flex-col"
        cz-shortcut-listen="true"
      >
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
