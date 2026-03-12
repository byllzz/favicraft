'use client';

import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <div className="relative pt-42 pb-20 overflow-hidden bg-white">

      {/* 1. Background Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Technical Frame Markers */}
      <div className="absolute top-40 left-10 hidden lg:block">
        <p className="text-[8px] font-black font-mango text-zinc-300 uppercase tracking-[0.5em] rotate-90 origin-left">
          LAT_40.7128 / LON_-74.0060
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col items-center">

        {/* Status Indicator */}
        <div className="mb-12 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex -space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-orange-200" />
          </div>
          <span className="text-[10px] font-bold font-mango uppercase tracking-[0.4em] text-zinc-400">
            System_v3.0.1 // Protocol_Active
          </span>
          <div className="h-[1px] w-12 bg-zinc-200" />
        </div>

        {/* Editorial Giant */}
        <div className="text-center space-y-8 max-w-5xl">
          <h1 className="text-7xl md:text-[10rem] font-medium text-black leading-[0.8] uppercase tracking-tighter italic animate-in fade-in zoom-in-95 duration-1000">
            WE MAKE{' '}
            <span className="relative inline-block not-italic text-zinc-300 group cursor-default">
              ICONS
              {/* Technical Bracket Decor */}
              <span className="absolute -top-4 -left-6 text-orange-500 text-sm font-mango font-black opacity-0 group-hover:opacity-100 transition-opacity">[</span>
              <span className="absolute -bottom-4 -right-6 text-orange-500 text-sm font-mango font-black opacity-0 group-hover:opacity-100 transition-opacity">]</span>

              {/* The Star */}
              <span className="absolute -top-10 -right-10 text-orange-500 text-5xl animate-pulse">★</span>
            </span>
            <br />
            <span className="text-black">INTERESTING</span>
          </h1>

          {/* Subtext Metadata */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="h-[1px] w-20 bg-zinc-100 hidden md:block" />
            <p className="text-[11px] tracking-[0.35em] font-bold text-zinc-500 uppercase font-mango text-center leading-relaxed">
              Industrial grade generation <br />
              <span className="text-orange-500">&</span> optimized vector deployment
            </p>
            <div className="h-[1px] w-20 bg-zinc-100 hidden md:block" />
          </div>
        </div>

        {/*  Hero Footer  */}
        <div className="relative left-23 mt-24 grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-12 w-full border-t border-zinc-100 pt-8 opacity-40 hover:opacity-100 transition-opacity duration-500">
          {[
            { label: 'RENDER_ENGINE', val: 'BILINEAR_v2' },
            { label: 'COMPRESSION', val: 'LOSSLESS_GZ' },
            { label: 'UPLOADS', val: '128.4K+' },
            { label: 'LATENCY', val: '0.004MS' }
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-[8px] font-black font-mango text-zinc-400 tracking-tighter uppercase">{stat.label}</p>
              <p className="text-[10px] font-bold text-black">{stat.val}</p>
            </div>
          ))}
        </div>

      </div>

       {/*Scroll Indecator..  */}
      <div>
        <ScrollIndicator  />
      </div>
    </div>
  );
}
