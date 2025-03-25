// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutContent from "@/components/LayoutContent";
import { LanguageProvider } from "../../contexts/LanguageContext";
import { PrototypePopupProvider } from "@/components/PrototypePopupProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GOROLL - Accessible Journeys",
  description: "A platform for accessible journeys and inclusive communities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <PrototypePopupProvider>
            <LayoutContent>{children}</LayoutContent>
          </PrototypePopupProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
