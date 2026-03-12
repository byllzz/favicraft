'use client';
import { ArrowUpRight, Globe, Shield, Cpu } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white text-black pt-40 pb-12 px-8 border-t border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-32">

        {/*  High-Impact Call to Action */}
        <div className="relative group cursor-pointer flex flex-col items-center text-center" onClick={scrollToTop}>
          <div className="absolute -top-12 flex flex-col items-center gap-2">
            <span className="text-[10px] font-black font-mango text-orange-500 uppercase tracking-[0.5em] animate-bounce">
              Return_to_Top
            </span>
            <div className="w-[1px] h-8 bg-zinc-200" />
          </div>

          <h2 className="text-8xl md:text-[15rem] font-medium leading-[0.75] tracking-tighter uppercase italic select-none">
            READY <br />
            <span className="text-zinc-100 group-hover:text-black transition-colors duration-700">TO BUILD?</span>
          </h2>

          <div className="mt-12 flex items-center gap-4">
            <p className="text-[11px] tracking-[0.4em] font-bold text-zinc-400 uppercase font-mango">
              Initialization_Protocol_01 // Global_Access
            </p>
          </div>
        </div>

        {/*  Technical Link Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 pt-20 border-t border-zinc-100">

          {/* Logo & Versioning */}
          <div className="col-span-2 space-y-6">
            <div className="text-3xl font-black leading-none tracking-tighter uppercase italic">
              FAVI<br />CRAFT<br />CO.
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-sm">
              <Cpu size={12} className="text-orange-500" />
              <span className="text-[9px] font-bold font-mango text-zinc-500 uppercase tracking-widest">
                v2026.4.12 // PRODUCTION_STABLE
              </span>
            </div>
          </div>

          {/* Social Directory */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black font-mango text-zinc-300 uppercase tracking-widest">
              <Globe size={10} /> Connectivity
            </div>
            <ul className="flex flex-col gap-2 text-[11px] font-bold uppercase italic tracking-tight">
              <li><a href="#" className="hover:text-orange-600 flex items-center gap-1 group">Twitter <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="#" className="hover:text-orange-600 flex items-center gap-1 group">LinkedIn <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="#" className="hover:text-orange-600 flex items-center gap-1 group">GitHub <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            </ul>
          </div>

          {/* Legal Manifest */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black font-mango text-zinc-300 uppercase tracking-widest">
              <Shield size={10} /> Compliance
            </div>
            <ul className="flex flex-col gap-2 text-[11px] font-bold uppercase italic tracking-tight">
              <li><a href="#" className="hover:text-orange-600">Privacy_Policy</a></li>
              <li><a href="#" className="hover:text-orange-600">Terms_of_Service</a></li>
              <li><a href="#" className="hover:text-orange-600">Security_v1</a></li>
            </ul>
          </div>

          {/* Location */}
          <div className="col-span-2 text-right hidden lg:block space-y-2">
            <p className="text-[9px] font-black font-mango text-zinc-300 uppercase tracking-widest">Laboratory_Location</p>
            <p className="text-xs font-bold leading-none">40.7128° N<br />74.0060° W</p>
            <p className="text-[10px] font-medium text-zinc-400 font-sans pt-4 italic">Available worldwide.</p>
          </div>
        </div>

        {/*  The Technical Footer Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-zinc-100">
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-bold text-zinc-300 font-sans tracking-tight">
              © 2026 FAVICRAFT INDUSTRIAL SYSTEMS
            </span>
            <div className="h-4 w-[1px] bg-zinc-100" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[9px] font-black font-mango text-green-600 uppercase">All_Systems_Operational</span>
            </div>
          </div>

          <div className="flex gap-4">
             <div className="px-3 py-1 border border-zinc-100 text-[9px] font-black font-mango uppercase tracking-tighter">
               Build_ID: FC-882-90
             </div>
             <div className="px-3 py-1 border border-zinc-100 text-[9px] font-black font-mango uppercase tracking-tighter bg-zinc-900 text-white">
               Encrypted_SSL
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
