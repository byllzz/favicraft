'use client';

export default function Faq() {
  const faqs = [
    {
      id: "QA_01",
      tag: "COMPATIBILITY",
      q: "What formats are accepted?",
      a: "The engine supports high-fidelity PNG, JPG, and SVG vectors. Our parsing logic ensures that source transparency is preserved throughout the rasterization process."
    },
    {
      id: "QA_02",
      tag: "LICENSING",
      q: "Is this free for commercial use?",
      a: "Yes. This is an open-standard utility. All assets generated are 100% royalty-free and ready for production deployment in any commercial environment."
    },
    {
      id: "QA_03",
      tag: "QUALITY",
      q: "Why choose Favicraft?",
      a: "Because precision matters. Most generators ignore bilinear interpolation and aspect-ratio padding. We treat your 16px assets with the same respect as a 4K render."
    }
  ];

  return (
    <section className="py-40 bg-white text-black border-t border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">

        <div className="flex flex-col lg:flex-row gap-20">

          {/* Left: Sticky Brand Block */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-[10px] font-bold font-mango uppercase tracking-[0.3em] text-zinc-400">
                  Support_Documentation
                </span>
              </div>

              <h2 className="text-7xl md:text-8xl font-medium leading-[0.8] uppercase italic tracking-tighter">
                Common <br /> <span className="text-zinc-300">Queries</span>
              </h2>

              <p className="text-xs font-medium text-zinc-500 max-w-[240px] leading-relaxed">
                Technical specifications and workflow protocols for the Favicraft rendering engine.
              </p>

              {/* Decorative Corner Mark */}
              <div className="pt-12 hidden lg:block">
                <div className="w-12 h-12 border-l border-b border-zinc-200" />
              </div>
            </div>
          </div>

          {/* Right: Technical Accordion/List */}
          <div className="lg:w-2/3 divide-y divide-zinc-100">
            {faqs.map((item, index) => (
              <div
                key={item.id}
                className="group py-12 first:pt-0 transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8">

                  {/* metadata label */}
                  <div className="flex flex-row md:flex-col gap-4 md:gap-1 min-w-[120px]">
                    <span className="text-[10px] font-black font-mango text-orange-500 tracking-widest">
                      [{item.id}]
                    </span>
                    <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-tighter">
                      // {item.tag}
                    </span>
                  </div>

                  {/* content */}
                  <div className="flex-1 space-y-6">
                    <h3 className="text-3xl md:text-4xl font-medium uppercase italic tracking-tight leading-none group-hover:text-orange-600 transition-colors">
                      {item.q}
                    </h3>
                    <div className="max-w-xl">
                      <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-sans">
                        {item.a}
                      </p>
                    </div>
                  </div>

                  {/* interaction indicator */}
                  <div className="hidden md:block">
                    <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-black group-hover:bg-black group-hover:text-white transition-all duration-500">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            ))}

            {/* Bottom contact CTA block */}
            <div className="pt-16">
              <div className="bg-zinc-50 p-8 rounded-sm border border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-[10px] font-black font-mango text-zinc-400 uppercase tracking-widest mb-1">Still_Confused?</p>
                  <p className="text-sm font-bold">Reach out to our technical support line.</p>
                </div>
                <button className="px-8 py-3 bg-black text-white text-[10px] font-bold font-mango uppercase tracking-widest hover:bg-orange-600 transition-colors">
                  Open_Ticket
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
