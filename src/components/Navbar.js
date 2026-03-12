'use client';
import { Github, Activity, Command } from 'lucide-react';

export default function Navbar({ onReset }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-8 h-20 flex justify-between items-center overflow-hidden">

      {/* Identity logo */}
      <div
        className="flex items-center gap-6 cursor-pointer group"
        onClick={onReset}
      >
        <div className="relative">
          <div className="text-xl leading-[0.85] font-black text-black uppercase tracking-tighter flex flex-col">
            <span>FAVI</span>
            <span>CRAFT</span>
            <span className="text-orange-500">CO.</span>
          </div>
          {/* Decorative corner brackets that appear on hover */}
          <div className="absolute -inset-2 border-l border-t border-black opacity-0 group-hover:opacity-100 transition-all duration-300 w-2 h-2" />
        </div>

        <div className="h-8 w-[1px] bg-zinc-100 hidden md:block" />

        {/* System Meta */}
        <div className="hidden lg:flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="text-[9px] font-black font-mango text-zinc-400 uppercase tracking-widest">Server_Node_01</span>
          </div>
          <span className="text-[8px] font-bold text-zinc-300 font-mono tracking-tighter uppercase">Status: Optimal // 12ms</span>
        </div>
      </div>

      {/*  Global Search */}
      <div className="hidden md:flex items-center bg-zinc-50 border border-zinc-100 px-4 py-1.5 rounded-sm gap-3 group cursor-text hover:border-zinc-300 transition-colors">
        <Command size={12} className="text-zinc-400" />
        <span className="text-[10px] font-bold font-mango text-zinc-400 uppercase tracking-widest">Press</span>
        <kbd className="bg-white border border-zinc-200 px-1.5 py-0.5 rounded text-[9px] font-mono text-zinc-500 shadow-sm">K</kbd>
        <span className="text-[10px] font-bold font-mango text-zinc-400 uppercase tracking-widest">to search</span>
      </div>

      {/*  Integration & Telemetry */}
      <div className="flex items-center gap-6">

        {/* Activity Monitor */}
        <div className="hidden sm:flex items-center gap-2 px-4 border-x border-zinc-100 h-20">
          <Activity size={14} className="text-zinc-300" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black font-mango text-zinc-300 uppercase leading-none">Traffic</span>
            <span className="text-[10px] font-bold text-black font-mono tracking-tighter">High_Density</span>
          </div>
        </div>

        {/* GitHub Action */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group p-2 overflow-hidden rounded-full hover:bg-black transition-colors duration-300"
        >
          <Github
            className="text-black group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 ease-in-out"
            size={22}
          />
          {/* Hover tool-tip style bubble */}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black font-mango text-black opacity-0 group-hover:opacity-100 transition-all">
            SOURCE
          </span>
        </a>

        {/* Mobile Menu Icon */}
        <div className="flex flex-col gap-1 md:hidden">
          <div className="w-4 h-0.5 bg-black" />
          <div className="w-2 h-0.5 bg-black ml-auto" />
        </div>
      </div>

    </nav>
  );
}
