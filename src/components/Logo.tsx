// src/components/Logo.tsx
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "small" | "medium" | "large";
  textPosition?: "right" | "bottom";
}

export function Logo({
  className = "",
  showText = true,
  size = "medium",
  textPosition = "right",
}: LogoProps) {
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-24 h-24",
    large: "w-48 h-48",
  };

  return (
    <Link
      href="/"
      className={`flex ${
        textPosition === "bottom" ? "flex-col items-center" : "items-center"
      } gap-2 ${className}`}
    >
      <div className={`relative ${sizeClasses[size]}`}>
        <Image
          src="/logo/logo.svg"
          alt="GOROLL Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span
          className={`font-bold text-blue-600 ${
            size === "large" ? "text-3xl" : "text-2xl"
          }`}
        >
          GOROLL
        </span>
      )}
    </Link>
  );
}
