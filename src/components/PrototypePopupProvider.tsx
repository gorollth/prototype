// src/components/PrototypePopupProvider.tsx
"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { PrototypePopup } from "./PrototypePopup";

// สร้าง context สำหรับใช้ใน provider
type PrototypePopupContextType = {
  showPopup: () => void;
};

const PrototypePopupContext = createContext<PrototypePopupContextType | null>(
  null
);

// Hook สำหรับใช้ context
export const usePrototypePopup = () => {
  const context = useContext(PrototypePopupContext);
  if (!context) {
    throw new Error(
      "usePrototypePopup must be used within a PrototypePopupProvider"
    );
  }
  return context;
};

export function PrototypePopupProvider({ children }: { children: ReactNode }) {
  // กำหนดให้ popup แสดงตั้งแต่เริ่มต้น
  const [showPrototypePopup, setShowPrototypePopup] = useState(true);

  const handleClosePopup = () => {
    setShowPrototypePopup(false);
  };

  const showPopup = () => {
    setShowPrototypePopup(true);
  };

  return (
    <PrototypePopupContext.Provider value={{ showPopup }}>
      {children}
      <PrototypePopup isOpen={showPrototypePopup} onClose={handleClosePopup} />
    </PrototypePopupContext.Provider>
  );
}
