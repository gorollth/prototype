// src/components/LayoutContent.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
