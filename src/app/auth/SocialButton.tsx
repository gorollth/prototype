// src/app/components/auth/SocialButton.tsx
interface SocialButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }
  
  export function SocialButton({ icon, label, onClick }: SocialButtonProps) {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        {icon}
        <span className="text-gray-700">{label}</span>
      </button>
    );
  }