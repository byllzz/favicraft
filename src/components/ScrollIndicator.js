'use client';
import { useState } from 'react';

export default function ScrollIndicator() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center group cursor-pointer"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>

      {/*Label */}
      <div className="overflow-hidden mb-2">
        <p className={`text-[9px] font-black font-mango tracking-[0.5em] uppercase transition-all duration-500 transform ${isHovered ? 'translate-y-0 text-orange-500' : 'translate-y-0 text-zinc-300'}`}>
          {isHovered ? 'Initialize_Scroll' : 'Scroll_to_Explore'}
        </p>
      </div>

      {/* Anchor Line */}
      <div className="relative h-16 w-[1px] bg-zinc-100 overflow-hidden">
        {/* Animated Scanning Bit */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-black animate-scroll-dash shadow-[0_0_8px_rgba(0,0,0,0.2)]" />

        {/* Hover State */}
        <div className={`absolute inset-0 bg-orange-500 transition-transform duration-700 origin-top ${isHovered ? 'scale-y-100' : 'scale-y-0'}`} />
      </div>

      {/*  Coordinate Node */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <div className={`w-1 h-1 rotate-45 transition-all duration-500 ${isHovered ? 'bg-orange-500 scale-150 rotate-90' : 'bg-zinc-200'}`} />

        {/* Micro-Telemetry */}
        <span className="text-[7px] font-mono text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
          REF_POS: 0.00
        </span>
      </div>

      <style jsx>{`
        @keyframes scroll-dash {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .animate-scroll-dash {
          animation: scroll-dash 2s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
      `}</style>
    </div>
  );
}
