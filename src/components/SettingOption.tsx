// src/app/settings/components/SettingOption.tsx
import React, { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface SettingOptionProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  rightContent?: ReactNode;
}

export function SettingOption({
  icon,
  title,
  description,
  onClick,
  rightContent,
}: SettingOptionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors border-b last:border-b-0"
    >
      <div className="flex items-center gap-4">
        <div className="text-gray-600">{icon}</div>
        <div className="text-left">
          <p className="font-medium text-gray-900">{title}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {rightContent}
        {onClick && <ChevronRight className="text-gray-400" size={20} />}
      </div>
    </button>
  );
}
