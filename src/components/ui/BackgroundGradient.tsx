import React from 'react';

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundGradient({ children, className = '' }: BackgroundGradientProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="relative">{children}</div>
    </div>
  );
}