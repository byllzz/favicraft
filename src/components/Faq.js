export default function Faq() {
  // config: questions & answers
  const faqs = [
    { q: "What formats do you support?", a: "We accept PNG, JPG, and SVG. We output high-quality PNGs and standard ICO files." },
    { q: "Is this tool free to use?", a: "Completely. It's a tribute to clean web standards and efficient developer workflows." },
    { q: "Why use Favicraft?", a: "Because most generators are ugly. We provide a premium experience for premium developers." }
  ];

  return (
    <section className="py-24 border-t border-slate-200">
      <div className="flex flex-col md:flex-row gap-12">

        {/* layout: sticky title block */}
        <div className="md:w-1/3">
          <h2 className="text-6xl font-medium leading-none sticky top-12 uppercase italic tracking-tighter">
            Common <br /> Questions<span className="text-orange-500">?</span>
          </h2>
        </div>

        {/* content: interactive list mapping */}
        <div className="md:w-2/3 space-y-16">
          {faqs.map((item, index) => (
            <div key={index} className="group border-b border-slate-200 pb-8">
              {/* accent: step indicator */}
              <span className="text-xs font-bold text-orange-500 block mb-4">0{index + 1}</span>

              {/* trigger: hover-italic effect */}
              <h3 className="text-3xl font-medium mb-4 group-hover:italic transition-all cursor-default uppercase tracking-tight">
                {item.q}
              </h3>

              {/* text: refined body copy */}
              <p className="text-slate-500 font-sans normal-case tracking-normal max-w-lg leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
