'use client';

export default function HowItWorks() {
  return (
    <section className="py-32 bg-[#FDF8F1] border-t border-black">
      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center">

        {/* badge: process category */}
        <div className="mb-8 border border-slate-300 px-6 py-2 rounded-full">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Process Flow</span>
        </div>

        {/* heading: oversized editorial title */}
        <h2 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.85] text-center mb-24 max-w-4xl uppercase italic">
          How the <br/> magic happens
        </h2>

        {/* canvas: diagram container */}
        <div className="w-full max-w-5xl aspect-[16/10] bg-white border border-slate-200 rounded-[40px] shadow-2xl relative overflow-hidden p-12 flex flex-col items-center">

          {/* pattern: subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>

          {/* node: client entry point */}
          <div className="relative z-10 bg-white border border-slate-100 shadow-sm px-6 py-3 rounded-2xl flex items-center gap-3 self-center">
            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center text-[10px]">🏢</div>
            <span className="text-[11px] font-bold tracking-tight">Client: SaaSflow</span>
          </div>

          {/* connector: vertical dashed pipe */}
          <svg className="w-full h-24 relative z-0 -mt-2">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* node: primary task block */}
          <div className="relative z-10 bg-white border border-slate-100 shadow-xl px-10 py-6 rounded-3xl flex flex-col items-start gap-2 w-72">
            <span className="text-[13px] font-black tracking-tight">Task: Web Design</span>
            <div className="flex gap-1">
               <div className="w-4 h-4 rounded-full bg-orange-100 border border-white"></div>
               <div className="w-4 h-4 rounded-full bg-purple-100 border border-white -ml-2"></div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-yellow-100 text-[8px] font-bold rounded">Tech Stack</span>
              <div className="flex gap-1 items-center">
                <span className="text-xs">🎨</span>
                <span className="text-xs">⚡</span>
              </div>
            </div>
          </div>

          {/* connector: branching logic paths */}
          <div className="relative w-full h-32">
             <svg className="w-full h-full absolute top-0 left-0">
                <path d="M 50% 0 L 50% 40 L 20% 40 L 20% 100" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 50% 0 L 50% 40 L 80% 40 L 80% 100" fill="none" stroke="#3B82F6" strokeWidth="2" />
             </svg>
          </div>

          {/* nodes: sub-process outcomes */}
          <div className="flex justify-between w-full mt-4">
            {/* left: draft state */}
            <div className="bg-white border border-slate-100 shadow-lg p-6 rounded-2xl w-56 -rotate-3 opacity-50">
               <span className="text-[10px] font-bold block mb-2">Subtasks: Wireframe</span>
               <div className="h-1 w-full bg-slate-100 rounded"></div>
            </div>

            {/* right: management state */}
            <div className="bg-white border border-slate-100 shadow-lg p-6 rounded-2xl w-64 rotate-2">
               <div className="flex gap-3 items-center mb-4">
                 <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">👩‍💻</div>
                 <div>
                   <p className="text-[11px] font-bold">Project Manager</p>
                   <p className="text-[9px] text-slate-400 tracking-tight">Managing Progress</p>
                 </div>
               </div>
               <div className="flex gap-2">
                  <span className="px-2 py-1 bg-yellow-100 text-[8px] font-bold rounded uppercase">Tech Stack</span>
                  <div className="flex gap-1">🚀 📊</div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
