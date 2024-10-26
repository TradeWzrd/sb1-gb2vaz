import React from 'react';

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ShimmerButton({ children, className = '', onClick }: ShimmerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 text-sm font-medium text-white 
        bg-gradient-to-r from-indigo-500 to-purple-500
        rounded-lg overflow-hidden transition-all duration-200
        hover:scale-[1.02] active:scale-[0.98]
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />
      <div className="absolute inset-0 transition-all duration-500 opacity-0 hover:opacity-100">
        <div className="absolute inset-0 translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <span className="relative">{children}</span>
    </button>
  );
}