'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function DropzoneSection({ getRootProps, getInputProps, isDragActive, preview, file }) {
  // state: viewport animation tracking
  const [scrollScale, setScrollScale] = useState(0.95);
  const [borderRadius, setBorderRadius] = useState(40);
  const sectionRef = useRef(null);

  // effect: premium scroll-linked expansion
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
      const progress = Math.max(0, 1 - distanceFromCenter / viewportHeight);

      // subtly scale from 95% to 100% when centered
      setScrollScale(0.95 + (progress * 0.05));
      setBorderRadius(40 - (progress * 16));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!getRootProps) return null;

  return (
    <section ref={sectionRef} className="relative w-full flex justify-center py-32 overflow-hidden bg-transparent">

      {/* container: technical bounding box */}
      <div
        {...getRootProps()}
        style={{
          transform: `scale(${scrollScale})`,
          borderRadius: `${borderRadius}px`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`
          w-full max-w-5xl aspect-[16/9] min-h-[500px] cursor-pointer
          border bg-white shadow-2xl relative overflow-hidden
          flex flex-col items-center justify-center p-8
          transition-colors duration-300 group
          ${isDragActive ? 'border-orange-500 bg-orange-50/20' : 'border-black hover:border-zinc-400'}
        `}
      >
        <input {...getInputProps()} />

        {/* decoration: corner registry marks */}
        <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-zinc-300" />
        <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-zinc-300" />
        <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-zinc-300" />
        <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-zinc-300" />

        {/* header: module status */}
        <div className="absolute top-8 left-0 w-full px-12 flex justify-between items-center z-10">
          <span className="text-[10px] font-bold font-mango uppercase tracking-widest text-zinc-400">
            [ Module_01 ]
          </span>
          <span className={`text-[10px] font-bold font-mango uppercase tracking-widest px-3 py-1 rounded-full border ${isDragActive ? 'bg-orange-500 text-white border-orange-500' : 'bg-zinc-100 text-zinc-400 border-zinc-200'}`}>
            {isDragActive ? 'Awaiting Drop' : 'Input Standby'}
          </span>
        </div>

        {preview ? (
          /* view: loaded asset preview */
          <div className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center w-full z-10 mt-8">
            <div className="bg-[#F8F8F8] p-12 rounded-2xl border border-zinc-200 shadow-inner mb-8 relative group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute top-4 right-4 text-[8px] font-black opacity-20 tracking-widest font-mango">MASTER_FILE</div>
              <Image
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-contain drop-shadow-2xl"
              />
            </div>

            <div className="flex flex-col items-center space-y-2">
              <p className="text-3xl font-medium tracking-tighter uppercase italic">{file?.name || 'Asset Loaded'}</p>
              <p className="font-mango text-[10px] tracking-widest text-orange-500 font-bold uppercase">
                Ready for processing →
              </p>
            </div>
          </div>
        ) : (
          /* view: empty drop target */
          <div className="text-center space-y-10 z-10 flex flex-col items-center mt-8">

            {/* icon: minimal crosshair */}
            <div className={`relative flex items-center justify-center w-32 h-32 rounded-full border border-dashed transition-all duration-500 ${isDragActive ? 'border-orange-500 scale-110 bg-orange-50/50' : 'border-zinc-300 bg-zinc-50 group-hover:bg-zinc-100'}`}>
              <div className={`w-12 h-[1px] absolute ${isDragActive ? 'bg-orange-500' : 'bg-black'}`} />
              <div className={`h-12 w-[1px] absolute ${isDragActive ? 'bg-orange-500' : 'bg-black'}`} />
              <div className="w-2 h-2 rounded-full bg-white border border-black z-10" />
            </div>

            <div className="space-y-4">
              <h3 className="text-5xl text-black md:text-6xl font-medium tracking-tighter uppercase italic">
                {isDragActive ? 'Release to Load' : 'Drag & Drop Asset'}
              </h3>
              <div className="flex items-center justify-center gap-4 text-[10px] font-bold font-mango tracking-[0.2em] text-zinc-400 uppercase">
                <span>PNG</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                <span>JPG</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                <span>SVG</span>
              </div>
            </div>

            {/* button: manual trigger hint */}
            <div className="px-6 py-3 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-orange-500 transition-colors">
              Or Browse Files
            </div>
          </div>
        )}

        {/* background: subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>
    </section>
  );
}
