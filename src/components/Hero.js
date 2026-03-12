// src/components/Hero.js
export default function Hero() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-center">
      <h1 className="text-6xl md:text-9xl font-medium text-slate-900 leading-none">
        We make <span className="relative inline-block italic">
          icons
          <span className="absolute -top-4 -right-4 text-orange-500 text-4xl">★</span>
        </span><br />
        interesting
      </h1>

      <p className="text-[10px] tracking-[0.2em] font-sans font-bold text-slate-500 max-w-xs mx-auto">
        KICK-ASS GENERATION, OPTIMIZATION, <br />DESIGN & INNOVATION.
      </p>
    </div>
  );
}
