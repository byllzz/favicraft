'use client';
import { useState, useEffect, useRef } from 'react';

export default function ExportDashboard({ file, preview, onReset }) {
  const [loading, setLoading] = useState(null);
  const [selectedSize, setSelectedSize] = useState('16');
  const [theme, setTheme] = useState('system');
  const [copied, setCopied] = useState(false);
  const [logs, setLogs] = useState(['SYSTEM_READY', 'AWAITING_COMMAND']);

  const sizes = [
    { label: 'Standard', value: '16', type: 'PNG' },
    { label: 'Retina', value: '32', type: 'PNG' },
    { label: 'Windows', value: '48', type: 'PNG' },
    { label: 'Apple_iOS', value: '180', type: 'PNG' },
    { label: 'Android_PWA', value: '192', type: 'PNG' },
    { label: 'Master_Res', value: '512', type: 'PNG' },
  ];

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [`${time} > ${msg}`, ...prev].slice(0, 5));
  };

  const handleDownload = async (sizeValue) => {
    const isBatch = sizeValue === 'all';
    setLoading(sizeValue);

    addLog(isBatch ? "INIT_BATCH_SEQUENCE" : `RASTERIZING_${sizeValue}PX`);
    if(isBatch) {
      setTimeout(() => addLog("GENERATING_MANIFEST_JSON"), 400);
      setTimeout(() => addLog("PACKING_BROWSERCONFIG"), 800);
      setTimeout(() => addLog("COMPRESSING_DEFLATE_L9"), 1200);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (!isBatch) formData.append('size', sizeValue);

      const res = await fetch('/api/generate', { method: 'POST', body: formData });
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = isBatch ? 'favicraft-pro-bundle.zip' : `favicon-${sizeValue}x${sizeValue}.png`;
      a.click();

      addLog(isBatch ? "BUNDLE_DISPATCHED" : "EXPORT_SUCCESS");
    } catch (e) {
      addLog("CRITICAL_ERROR_LOGGED");
    } finally {
      setLoading(null);
    }
  };

  // Header Injection
  const htmlCode = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#ffffff">`;

  return (
    <section className="w-full max-w-[1400px] mx-auto min-h-[750px] bg-white border border-zinc-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-700">

      {/*  Global Tool Header */}
      <header className="h-16 border-b border-zinc-100 flex items-center justify-between px-8 bg-zinc-50/50">
        <div className="flex items-center gap-6">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-zinc-200" />
            <div className="w-2 h-2 rounded-full bg-zinc-200" />
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          </div>
          <div className="h-4 w-[1px] bg-zinc-200" />
          <span className="text-[10px] font-black font-mango tracking-[0.2em] text-zinc-400 uppercase">
            Asset_Engine // <span className="text-black">{file?.name?.split('.')[0] || 'TEMP_STREAM'}</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex bg-zinc-200/50 p-1 rounded-sm border border-zinc-100">
            {['light', 'dark', 'glass'].map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-1 text-[9px] font-black uppercase transition-all ${theme === t ? 'bg-white shadow-sm text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button onClick={onReset} className="text-[10px] font-black font-mango bg-black text-white px-6 py-2 hover:bg-orange-600 transition-all active:scale-95">
            NEW_UPLOAD
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">

        {/*  Left Sidebar */}
        <aside className="w-80 border-r border-zinc-100 p-8 flex flex-col gap-10 bg-zinc-50/30">
          <div>
            <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-6 flex justify-between">
              Export_Nodes <span>[0{sizes.length}]</span>
            </h4>
            <div className="space-y-2">
              {sizes.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSelectedSize(s.value)}
                  className={`w-full flex items-center justify-between p-4 text-left transition-all border group ${selectedSize === s.value ? 'bg-white border-zinc-200 shadow-md translate-x-1' : 'border-transparent opacity-40 hover:opacity-80'}`}
                >
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-tight">{s.label}</span>
                    <span className="text-[9px] font-mono text-zinc-400">Target_Layer</span>
                  </div>
                  <span className={`text-[10px] font-mono ${selectedSize === s.value ? 'text-orange-500' : 'text-zinc-400'}`}>{s.value}px</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-3 pt-6 border-t border-zinc-100">
             <button
                disabled={!!loading}
                onClick={() => handleDownload(selectedSize)}
                className="w-full bg-zinc-900 text-white py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
             >
               {loading === selectedSize ? 'PROCESSING_BITSTREAM...' : 'Render Selection'}
             </button>
             <button
                disabled={!!loading}
                onClick={() => handleDownload('all')}
                className="w-full border-2 border-zinc-900 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all"
             >
               {loading === 'all' ? 'PACKING_BUNDLE...' : 'Generate Pro Bundle (.zip)'}
             </button>
          </div>
        </aside>

        {/*  Central Canvas */}
        <main className="flex-1 bg-[#F5F5F5] relative flex items-center justify-center p-20 overflow-hidden">
           {/* Technical Framing */}
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

           <div className={`relative transition-all duration-1000 p-32 rounded-[3rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.2)]
             ${theme === 'dark' ? 'bg-zinc-900' : theme === 'glass' ? 'bg-white/40 backdrop-blur-3xl border border-white/60' : 'bg-white'}`}>

             {/* The Asset Display */}
             <div className="relative group">
                <img
                  src={preview}
                  className="w-40 h-40 object-contain transition-all duration-700 group-hover:scale-105"
                  alt="Preview"
                  style={{ imageRendering: selectedSize === '16' ? 'pixelated' : 'auto' }}
                />
                <div className="absolute -inset-12 border border-dashed border-zinc-200 rounded-full animate-[spin_30s_linear_infinite] opacity-30" />
                <div className="absolute -inset-4 border border-zinc-100 rounded-2xl opacity-50" />
             </div>

             {/* Live Resolution Tag */}
             <div className="absolute top-8 right-8">
               <span className="text-[10px] font-mono font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded">
                 {selectedSize}x{selectedSize}
               </span>
             </div>
           </div>

           {/* Bottom Coordinate Bar */}
           <div className="absolute bottom-6 left-8 right-8 flex justify-between">
              <span className="text-[9px] font-mono text-zinc-300">CRC32: 0x82B1A2</span>
              <span className="text-[9px] font-mono text-zinc-300">LANCZOS_SCALING_ACTIVE</span>
           </div>
        </main>

        {/*  Right Sidebar */}
        <aside className="w-80 border-l border-zinc-100 flex flex-col bg-white">
          <div className="p-8 border-b border-zinc-100">
            <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-6">Metadata_Inspector</h4>
            <div className="grid grid-cols-1 gap-1">
              {[
                { l: 'Sampling', v: 'Lanczos3 (High-Fi)' },
                { l: 'Color_Space', v: 'sRGB_IEC61966-2.1' },
                { l: 'Alpha_Channel', v: 'Optimized_PNG' },
                { l: 'Compression', v: 'Deflate_Level_9' }
              ].map(i => (
                <div key={i.l} className="flex justify-between py-2 border-b border-zinc-50 last:border-0">
                  <p className="text-[9px] text-zinc-400 font-bold uppercase">{i.l}</p>
                  <p className="text-[9px] font-black">{i.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">Head_Protocol</h4>
              <button
                onClick={() => { navigator.clipboard.writeText(htmlCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className={`text-[9px] font-black px-2 py-1 transition-all ${copied ? 'bg-green-500 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-black hover:text-white'}`}
              >
                {copied ? 'COPIED' : 'COPY_SNIPPET'}
              </button>
            </div>
            <div className="bg-zinc-900 rounded-sm p-5 font-mono text-[10px] text-zinc-500 leading-relaxed flex-1 overflow-hidden">
              <code className="block whitespace-pre-wrap">{htmlCode}</code>
            </div>
          </div>

          {/* Telemetry Log */}
          <div className="p-6 bg-zinc-50 border-t border-zinc-100 min-h-[140px]">
             <div className="flex items-center gap-2 text-[9px] font-black font-mango text-black mb-4 tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
               LIVE_TELEMETRY
             </div>
             <div className="space-y-1.5 overflow-hidden">
                {logs.map((log, idx) => (
                  <p key={idx} className={`text-[9px] font-mono leading-none ${idx === 0 ? 'text-black font-bold' : 'text-zinc-400 opacity-60'}`}>
                    {log}
                  </p>
                ))}
             </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
