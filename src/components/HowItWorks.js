'use client';

export default function HowItWorks() {
  const steps = [
    { id: '01', title: 'Ingestion', tech: 'Vector_Parse', desc: 'Raw assets are deconstructed into mathematical coordinates for scaling.' },
    { id: '02', title: 'Refinement', tech: 'Sharp_Bilinear', desc: 'Pixels are recalculated using Lanczos3 kernels for micro-clarity.' },
    { id: '03', title: 'Delivery', tech: 'Manifest_Gen', desc: 'The full production bundle is packaged with PWA metadata.' }
  ];

  return (
    <section className="py-32 bg-white text-black selection:bg-orange-500/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">

        {/*  Header */}
        <div className="flex flex-col items-center mb-32">
          <div className="mb-8 border border-zinc-200 px-6 py-2 rounded-sm bg-zinc-50 shadow-sm">
            <span className="text-[10px] font-black font-mango text-orange-500 uppercase tracking-[0.4em]">
              Protocol_Documentation_v3.0
            </span>
          </div>
          <h2 className="text-7xl md:text-[9rem] font-medium tracking-tighter leading-[0.8] text-center max-w-5xl uppercase italic">
            The Logic <br/> <span className="text-zinc-200">Inside the</span> Engine
          </h2>
        </div>

        {/* Pipeline */}
        <div className="relative border border-zinc-200 rounded-sm bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.05)] overflow-hidden">

          {/* Window Header Decor */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-100 bg-zinc-50/50">
            <div className="flex gap-3">
              <div className="w-2.5 h-2.5 rounded-full border border-zinc-300" />
              <div className="w-2.5 h-2.5 rounded-full border border-zinc-300" />
              <div className="w-2.5 h-2.5 rounded-full border border-zinc-300" />
            </div>
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[9px] font-black font-mango text-zinc-400 tracking-[0.5em] uppercase">Status // Ready</span>
            </div>
            <div className="hidden md:block w-24 h-1 bg-zinc-200 rounded-full" />
          </div>

          {/* Main Content: 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">
            {steps.map((step) => (
              <div key={step.id} className="relative p-12 group hover:bg-zinc-50 transition-all duration-500">

                {/* Large Background Identifier */}
                <span className="absolute top-8 right-8 text-[10rem] font-black text-zinc-50 group-hover:text-orange-500/5 transition-colors pointer-events-none italic leading-none">
                  {step.id}
                </span>

                <div className="relative z-10 space-y-12">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black font-mango text-orange-500 uppercase tracking-widest border-b border-orange-500/20 pb-1">
                      {step.tech}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-5xl font-medium tracking-tighter uppercase italic group-hover:translate-x-2 transition-transform duration-500">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-[260px] font-sans">
                      {step.desc}
                    </p>
                  </div>

                  {/* High-Contrast Micro-Diagrams */}
                  <div className="h-32 w-full bg-white border border-zinc-100 rounded-sm flex items-center justify-center relative overflow-hidden group-hover:border-zinc-300 transition-colors shadow-inner">
                    {step.id === '01' && (
                       <div className="relative w-12 h-12 border border-zinc-300 group-hover:border-orange-500 transition-colors group-hover:rotate-[135deg] duration-1000">
                          <div className="absolute inset-0 border border-dashed border-zinc-200 scale-150" />
                       </div>
                    )}
                    {step.id === '02' && (
                      <div className="flex gap-2 items-center">
                        {[0.3, 0.8, 0.5, 0.9, 0.4].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h * 40}px` }}
                            className="w-1.5 bg-zinc-100 group-hover:bg-black transition-all duration-500"
                          />
                        ))}
                      </div>
                    )}
                    {step.id === '03' && (
                       <div className="relative">
                         <div className="w-10 h-12 border-2 border-black flex items-center justify-center font-black font-mango text-[9px] group-hover:bg-black group-hover:text-white transition-all">
                           ZIP
                         </div>
                         <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full" />
                       </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Execution Marquee  */}
          <div className="bg-zinc-50 p-6 border-t border-zinc-100 font-mango overflow-hidden relative">
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-12 text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-bold">
                  <span>&gt; SYS_INIT_OK</span>
                  <span>&gt; PARSING_SOURCE_PATH_0{i+1}</span>
                  <span className="text-orange-500">&gt; APPLYING_LANCZOS_KERNEL</span>
                  <span>&gt; BUFFER_STAGING_COMPLETE</span>
                  <span>&gt; BYTES_WRITTEN: 12.4KB</span>
                </div>
              ))}
            </div>
            {/* Soft Fades for Marquee */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent" />
          </div>
        </div>

        {/* Secondary Metadata Footer */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity">
           <div className="text-[9px] font-black font-mango uppercase tracking-widest border-l-2 border-orange-500 pl-4">
             Rendering_Model: Industrial_Bilinear_v2 <br/>
             Optimization_Pass: Lossless_GZip
           </div>
           <div className="flex gap-8 items-center text-[9px] font-bold font-mono text-zinc-400">
             <span>CLOCK: 2.4GHZ</span>
             <span>LOAD: 0.04%</span>
             <span>THRD: 08/16</span>
           </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
