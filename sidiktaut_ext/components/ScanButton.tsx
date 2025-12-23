import React from 'react';
import { Loader2, ScanLine } from 'lucide-react';

interface ScanButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export const ScanButton: React.FC<ScanButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full 
        py-4 
        px-6 
        rounded-2xl 
        font-semibold 
        text-base 
        transition-all 
        duration-300 
        flex 
        items-center 
        justify-center 
        gap-2
        shadow-lg
        ${isLoading 
          ? 'bg-glass-200 text-gray-300 cursor-wait' 
          : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white transform hover:scale-[1.02] active:scale-[0.98]'
        }
        disabled:opacity-50
        disabled:cursor-not-allowed
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Menganalisis...</span>
        </>
      ) : (
        <>
          <ScanLine className="w-5 h-5" />
          <span>Scan Sekarang</span>
        </>
      )}
    </button>
  );
};