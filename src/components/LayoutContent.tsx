// src/components/LayoutContent.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";
import { useLanguage } from "../../contexts/LanguageContext";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // const { t } = useLanguage(); // Added for potential future translations

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password";

  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1">{children}</main>
      {!isAuthPage && <Navbar />}
    </div>
  );
}
