'use client';
import { useState } from 'react';

export default function ExportDashboard({ file, preview, onReset }) {
  // state: tracking download status & selection
  const [loading, setLoading] = useState(null);
  const [selectedSize, setSelectedSize] = useState('16');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // config: available resolution options
  const sizes = [
    { label: 'Standard Favicon', value: '16' },
    { label: 'Retina Display', value: '32' },
    { label: 'Apple Touch Icon', value: '180' },
    { label: 'Android Chrome', value: '192' },
  ];

  // handler: async fetch & blob download
  const handleDownload = async (sizeValue) => {
    const targetSize = sizeValue || 'all';
    setLoading(targetSize);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('size', targetSize);

    try {
      const response = await fetch('/api/generate', { method: 'POST', body: formData });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = targetSize === 'all' ? 'favicons.zip' : `favicon-${targetSize}x${targetSize}.png`;
      a.click();
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setLoading(null);
    }
  };

  // static: snippet for head tag
  const htmlCode = `<link rel="icon" href="/favicon.ico" sizes="any">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">`;

  return (
    <section className="py-24 animate-in fade-in zoom-in-95 duration-1000">

      {/* header: editorial title & reset toggle */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="space-y-2">
          <span className="text-[10px] font-black tracking-[0.5em] text-orange-500 uppercase">Status: Success</span>
          <h2 className="text-7xl md:text-8xl font-medium tracking-tighter leading-[0.8] uppercase italic">
            Asset <br /> Generated
          </h2>
        </div>
        <button
          onClick={onReset}
          className="text-[10px] font-bold tracking-[0.3em] border-b border-black pb-1 hover:text-orange-500 hover:border-orange-500 transition-all uppercase"
        >
          [ Clear & Restart ]
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* controls: resolution dropdown & triggers */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <p className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">Select Individual Resolution</p>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full border border-black p-6 flex justify-between items-center group hover:bg-black hover:text-white transition-all duration-300"
              >
                <span className="font-medium tracking-tight uppercase">
                  {sizes.find(s => s.value === selectedSize)?.label} — {selectedSize}PX
                </span>
                <span className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>↓</span>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-x border-b border-black z-50 animate-in slide-in-from-top-2 duration-200">
                  {sizes.map((size) => (
                    <button
                      key={size.value}
                      className="w-full p-4 text-left hover:bg-zinc-50 transition-colors border-t border-zinc-100 first:border-none flex justify-between items-center"
                      onClick={() => {
                        setSelectedSize(size.value);
                        setDropdownOpen(false);
                      }}
                    >
                      <span className="text-sm font-medium uppercase tracking-tighter">{size.label}</span>
                      <span className="text-[10px] font-mono opacity-50">{size.value}x{size.value}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleDownload(selectedSize)}
              disabled={loading === selectedSize}
              className="w-full bg-black text-white p-6 font-bold tracking-[0.2em] text-xs uppercase hover:bg-orange-500 transition-colors disabled:bg-zinc-400"
            >
              {loading === selectedSize ? 'Processing...' : `Download ${selectedSize}PX Asset`}
            </button>
          </div>

          <div className="h-[1px] w-full bg-zinc-200" />

          {/* action: zip bundle generator */}
          <button
            onClick={() => handleDownload('all')}
            disabled={loading === 'all'}
            className="w-full border-2 border-black p-8 font-black text-sm tracking-[0.4em] uppercase hover:invert transition-all flex justify-between items-center"
          >
            {loading === 'all' ? 'Packing ZIP...' : 'Generate Full Pro Bundle'}
            <span>→</span>
          </button>
        </div>

        {/* visual: context mockup & source code */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#F8F8F8] p-12 rounded-sm border border-zinc-200 relative overflow-hidden group">
            <div className="absolute top-4 right-6 text-[8px] font-black opacity-20 tracking-[0.5em] rotate-90 origin-right">PREVIEW_MODE</div>

            <div className="max-w-md mx-auto bg-white shadow-2xl rounded-xl border border-zinc-200 overflow-hidden">
               <div className="bg-zinc-100 px-4 py-3 border-b border-zinc-200 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400/50"></div>
                  </div>
                  <div className="ml-2 flex-1 bg-white h-6 rounded-md border border-zinc-200 flex items-center px-3 gap-2">
                    <img src={preview} className="w-3 h-3 grayscale opacity-80" alt="" />
                    <div className="w-16 h-1 bg-zinc-100 rounded"></div>
                  </div>
               </div>
               <div className="p-10 flex flex-col items-center justify-center space-y-4">
                  <img src={preview} className="w-20 h-20 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700" alt="Result" />
                  <p className="text-[10px] font-black tracking-widest text-zinc-300">MASTER_SOURCE_PREVIEW</p>
               </div>
            </div>
          </div>

          {/* snippet: clipboard integration */}
          <div className="space-y-4">
            <p className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">Manual Implementation</p>
            <div className="bg-zinc-900 p-8 relative group">
              <pre className="text-zinc-400 text-[11px] font-mono leading-relaxed">
                <code>{htmlCode}</code>
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(htmlCode)}
                className="absolute top-4 right-4 text-[9px] text-white/40 hover:text-orange-500 font-bold tracking-widest"
              >
                [ COPY ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
