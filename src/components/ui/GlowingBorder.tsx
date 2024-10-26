import React from 'react';
import { cn } from '../../utils/cn';

interface GlowingBorderProps extends React.HTMLProps<HTMLDivElement> {
  glowColor?: string;
}

export function GlowingBorder({ 
  children,
  className,
  glowColor = 'from-indigo-500 via-purple-500 to-pink-500',
  ...props
}: GlowingBorderProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl",
        "before:absolute before:-inset-0.5",
        "before:bg-gradient-to-r",
        "before:blur-sm before:animate-glow",
        "before:rounded-xl",
        className
      )}
      style={{
        '--glow-color': glowColor
      } as React.CSSProperties}
      {...props}
    >
      <div className="relative bg-gray-900 rounded-xl">
        {children}
      </div>
    </div>
  );
}