'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Download, Terminal, Settings2, Box, Layers, Cpu, Code2, RefreshCw } from 'lucide-react';

export default function ExportDashboard({ file, preview, onReset }) {
  const [loading, setLoading] = useState(null);
  const [selectedSize, setSelectedSize] = useState('16');
  const [theme, setTheme] = useState('dark');
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

  const htmlCode = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#ffffff">`;

  return (
    <section className="w-full max-w-[1440px] mx-auto min-h-screen lg:min-h-[800px] bg-white border border-zinc-200 flex flex-col overflow-hidden animate-in fade-in duration-700 relative">

      {/* Header */}
      <header className="py-4 lg:py-0 lg:h-20 border-b border-zinc-200 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 bg-white/80 backdrop-blur-md z-20 gap-4 lg:gap-0">
        <div className="flex items-center justify-between w-full lg:w-auto gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-black font-mango tracking-[0.4em] text-orange-600 uppercase">Production_Environment</span>
            <span className="text-xl font-black text-zinc-900 uppercase tracking-tighter italic">
              {file?.name?.split('.')[0] || 'TEMP_STREAM'}
              <span className="text-zinc-500 not-italic ml-2 text-sm font-mono tracking-normal">.raw</span>
            </span>
          </div>

          <div className="hidden lg:block h-8 w-[1px] bg-zinc-200" />

          <div className="hidden lg:flex items-center gap-4">
             <div className="flex flex-col">
                <span className="text-[8px] font-bold text-zinc-500 uppercase">Core_Status</span>
                <span className="text-[10px] font-mono text-green-600">OPTIMAL // 32°C</span>
             </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full lg:w-auto gap-4 lg:gap-8">
          <div className="flex bg-zinc-50 border border-zinc-200 p-1">
            {['light', 'dark', 'glass'].map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 lg:px-5 py-1.5 text-[9px] font-black uppercase transition-all ${theme === t ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            onClick={onReset}
            className="group flex items-center gap-2 lg:gap-3 bg-orange-600 text-white px-4 lg:px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all shadow-sm"
          >
            <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden xs:inline">RE_INITIALIZE</span>
            <span className="xs:hidden">RESET</span>
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden custom-scrollbar">

        {/* Left Sidebar */}
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-zinc-200 p-6 lg:p-8 flex flex-col bg-zinc-50 shrink-0">
          <div className="mb-6 lg:mb-10 flex items-center gap-2">
            <Layers size={14} className="text-orange-600" />
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Export_Grid</h4>
          </div>

          <div className="lg:flex-1 flex flex-row lg:flex-col lg:space-y-1 gap-2 lg:gap-0 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto pr-2 pb-4 lg:pb-0 custom-scrollbar">
            {sizes.map(s => (
              <button
                key={s.value}
                onClick={() => setSelectedSize(s.value)}
                className={`min-w-[160px] lg:min-w-0 lg:w-full flex items-center justify-between p-5 text-left transition-all border shrink-0 ${selectedSize === s.value
                  ? 'bg-white border-zinc-300 lg:translate-x-1 shadow-[0_2px_0_0_#ea580c] lg:shadow-[4px_0_0_0_#ea580c]'
                  : 'bg-transparent border-zinc-200 lg:border-transparent opacity-70 lg:opacity-60 hover:opacity-100 hover:bg-white hover:border-zinc-200'}`}
              >
                <div className="flex flex-col">
                  <span className={`text-[11px] font-black uppercase ${selectedSize === s.value ? 'text-zinc-900' : 'text-zinc-500'}`}>{s.label}</span>
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-tighter">Layer_ID: {s.type}_{s.value}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[12px] font-mono font-bold ${selectedSize === s.value ? 'text-orange-600' : 'text-zinc-400'}`}>{s.value}px</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 lg:mt-8 flex flex-col lg:flex-col gap-2">
            <button
              disabled={!!loading}
              onClick={() => handleDownload(selectedSize)}
              className="w-full bg-zinc-900 text-white py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              {loading === selectedSize ? <Terminal size={14} className="animate-pulse" /> : <Download size={14} />}
              {loading === selectedSize ? 'RASTERIZING...' : 'Render_Selected'}
            </button>
            <button
              disabled={!!loading}
              onClick={() => handleDownload('all')}
              className="w-full border border-zinc-300 bg-white text-zinc-600 py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-100 hover:text-zinc-900 transition-all flex items-center justify-center gap-3"
            >
              <Box size={14} />
              {loading === 'all' ? 'COMPRESSING...' : 'Gen_Pro_Bundle.zip'}
            </button>
          </div>
        </aside>

        {/* Central Canvas */}
        <main className="flex-1 bg-white relative flex items-center justify-center p-12 lg:p-24 min-h-[50vh] lg:min-h-0 overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-40 pointer-events-none"
               style={{ backgroundImage: 'linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Decorative Corner Brackets */}
          <div className="absolute top-4 left-4 lg:top-12 lg:left-12 w-8 h-8 lg:w-12 lg:h-12 border-t border-l border-zinc-300" />
          <div className="absolute top-4 right-4 lg:top-12 lg:right-12 w-8 h-8 lg:w-12 lg:h-12 border-t border-r border-zinc-300" />
          <div className="absolute bottom-4 left-4 lg:bottom-12 lg:left-12 w-8 h-8 lg:w-12 lg:h-12 border-b border-l border-zinc-300" />
          <div className="absolute bottom-4 right-4 lg:bottom-12 lg:right-12 w-8 h-8 lg:w-12 lg:h-12 border-b border-r border-zinc-300" />

          {/* Main Asset Viewport */}
          <div className={`relative group transition-all duration-1000 p-12 lg:p-24 border border-zinc-200 shadow-sm
            ${theme === 'dark' ? 'bg-zinc-900' : theme === 'glass' ? 'bg-zinc-50/50 backdrop-blur-xl' : 'bg-zinc-50'}`}>

            <div className="relative z-10">
              <Image
                src={preview}
                className="w-32 h-32 lg:w-56 lg:h-56 object-contain transition-all duration-700 group-hover:scale-110"
                alt="Preview"
                style={{ imageRendering: selectedSize === '16' ? 'pixelated' : 'auto' }}
              />
              {/* Technical Overlay */}
              <div className="absolute -top-8 -left-8 lg:-top-12 lg:-left-12 flex flex-col gap-1">
                <span className="text-[6px] lg:text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Dimension_Check</span>
                <span className="text-[10px] lg:text-xs font-bold text-orange-600">{selectedSize} x {selectedSize} px</span>
              </div>

              {/* Rotating Gear Decor */}
              <div className="absolute -inset-8 lg:-inset-16 border border-dashed border-zinc-300 rounded-full animate-[spin_60s_linear_infinite] opacity-60 pointer-events-none" />
            </div>

            {/* Visual Balance Dots */}
            <div className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 flex gap-1">
              <div className="w-1 h-1 bg-zinc-300" />
              <div className="w-1 h-1 bg-zinc-300" />
              <div className="w-1 h-1 bg-orange-500" />
            </div>
          </div>

          {/* Bottom  */}
          <div className="absolute bottom-6 lg:bottom-10 flex flex-wrap justify-center items-center gap-4 lg:gap-12 text-zinc-500 font-mono text-[8px] lg:text-[9px] tracking-widest uppercase px-4 text-center">
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-300 rotate-45" /> Scale: Bilinear_Fixed</span>
            <span className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-300 rotate-45" /> Depth: 32_Bit_Alpha</span>
            <span className="flex items-center gap-2 text-orange-700"><div className="w-1 h-1 bg-orange-500 rotate-45" /> Ready_for_Buffer</span>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-84 border-t lg:border-t-0 lg:border-l border-zinc-200 flex flex-col bg-zinc-50 shrink-0">
          <div className="p-6 lg:p-8 border-b border-zinc-200 bg-white">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 size={14} className="text-orange-600" />
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Module_Properties</h4>
            </div>
            <div className="space-y-4">
              {[
                { l: 'Resampling', v: 'Lanczos_Kernel_v3', icon: <Cpu size={10} /> },
                { l: 'Color_Target', v: 'sRGB_Industrial', icon: <Box size={10} /> },
                { l: 'Transparency', v: 'Full_Alpha_Channel', icon: <Layers size={10} /> },
                { l: 'Payload', v: 'Deflate_L9_Heavy', icon: <Terminal size={10} /> }
              ].map(i => (
                <div key={i.l} className="group cursor-default">
                  <div className="flex justify-between items-end mb-1">
                    <p className="text-[8px] text-zinc-500 font-bold uppercase flex items-center gap-2">
                      {i.icon} {i.l}
                    </p>
                    <p className="text-[10px] font-bold text-zinc-900 group-hover:text-orange-600 transition-colors">{i.v}</p>
                  </div>
                  <div className="h-[1px] w-full bg-zinc-200" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-8 flex-1 flex flex-col lg:min-h-0 min-h-[250px] bg-zinc-50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-orange-600" />
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Head_Inject</h4>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(htmlCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className={`text-[9px] font-black px-4 py-1.5 transition-all border ${copied ? 'bg-orange-600 border-orange-600 text-white' : 'border-zinc-300 text-zinc-500 bg-white hover:border-zinc-900 hover:text-zinc-900'}`}
              >
                {copied ? 'COPIED_TO_CLIPBOARD' : 'EXTRACT_SNIPPET'}
              </button>
            </div>

            <div className="relative flex-1 group shadow-sm">
              <div className="absolute inset-0 bg-white border border-zinc-200 p-6 font-mono text-[11px] text-zinc-600 leading-relaxed overflow-hidden">
                <code className="block whitespace-pre-wrap selection:bg-orange-200">
                  {htmlCode}
                </code>
              </div>
              <div className="absolute bottom-4 right-4 text-[8px] font-mono text-zinc-400 uppercase">UTF-8 // Standard_HTML5</div>
            </div>
          </div>

          {/*  Footer */}
          <div className="p-6 bg-white border-t border-zinc-200 shrink-0">
             <div className="flex items-center gap-2 text-[9px] font-black font-mango text-zinc-900 mb-4 tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
               SYSTEM_LIVE_TELEMETRY
             </div>
             <div className="space-y-2">
                {logs.map((log, idx) => (
                  <div key={idx} className={`flex gap-3 text-[9px] font-mono leading-none ${idx === 0 ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    <span className="text-orange-600">[{idx}]</span>
                    <p className="truncate">{log}</p>
                  </div>
                ))}
             </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
