import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        backdrop-blur-xl 
        bg-white/10 
        border border-white/20 
        shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] 
        rounded-3xl 
        p-5 
        text-white 
        ${className}
      `}
    >
      {children}
    </div>
  );
};