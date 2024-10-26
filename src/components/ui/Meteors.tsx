import React from 'react';
import { cn } from '../../utils/cn';

interface MeteorsProps {
  number?: number;
}

export function Meteors({ number = 20 }: MeteorsProps) {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className={cn(
            "animate-meteor absolute top-1/2 left-1/2",
            "h-0.5 w-0.5 rounded-[9999px] bg-slate-500",
            "rotate-[215deg] shadow-[0_0_0_1px_#ffffff10]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%]",
            "before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * window.innerWidth) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s"
          }}
        />
      ))}
    </>
  );
}