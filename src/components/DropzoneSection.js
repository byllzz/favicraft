'use client';
import { useState, useEffect, useRef } from 'react';

export default function DropzoneSection({ getRootProps, getInputProps, isDragActive, preview, file }) {
  // state: animation tracking
  const [scrollScale, setScrollScale] = useState(0.8);
  const [borderRadius, setBorderRadius] = useState(40);
  const sectionRef = useRef(null);

  // effect: scroll-based expansion logic
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
      const progress = Math.max(0, 1 - distanceFromCenter / viewportHeight);

      setScrollScale(0.8 + (progress * 0.2));
      setBorderRadius(40 - (progress * 40));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // safety: prevents crash if props missing
  if (!getRootProps) return null;

  return (
    <section ref={sectionRef} className="relative w-full flex justify-center py-24 overflow-hidden bg-transparent">
      {/* container: glassmorphism & scale effect */}
      <div
        {...getRootProps()}
        style={{
          transform: `scale(${scrollScale})`,
          borderRadius: `${borderRadius}px`,
          transition: 'transform 0.2s ease-out, border-radius 0.2s ease-out'
        }}
        className={`
          w-full max-w-4xl min-h-[550px] cursor-pointer
          border border-[#E2E8F0] bg-white/80 backdrop-blur-xl
          flex flex-col items-center justify-between p-8 relative
          transition-all duration-500 group
          ${isDragActive ? 'ring-4 ring-[#8B5CF6]/10 border-[#8B5CF6]' : 'shadow-[0_20px_50px_rgba(139,92,246,0.1)]'}
        `}
      >
        <input {...getInputProps()} />

        {/* header: modal style title */}
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="text-[#64748B] text-lg font-medium">Upload your image</h3>
          <div className="text-[#94A3B8] hover:text-[#64748B] transition-colors text-xl">✕</div>
        </div>

        {/* zone: interactive drop area */}
        <div className={`
          flex-1 w-full border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 transition-colors
          ${isDragActive ? 'bg-[#F5F3FF] border-[#C4B5FD]' : 'bg-[#F8FAFC] border-[#E2E8F0]'}
        `}>

          {preview ? (
            /* view: upload success & preview */
            <div className="animate-in fade-in zoom-in duration-500 text-center flex flex-col items-center">
              <div className="relative group mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-contain rounded-2xl bg-white shadow-md p-2"
                />
              </div>
              <p className="text-[#64748B] font-medium">{file?.name || 'image_uploaded.png'}</p>
              <p className="text-[#94A3B8] text-sm italic">File ready for processing</p>
            </div>
          ) : (
            /* view: empty state & instructions */
            <div className="text-center space-y-6">
              <div className="relative inline-block group">
                <div className="w-24 h-24 bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] rounded-3xl shadow-[0_10px_25px_rgba(139,92,246,0.4)] flex items-center justify-center transform group-hover:-translate-y-1 transition-transform">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[#64748B] text-lg">
                  Drag and drop or <span className="text-[#7C3AED] font-semibold underline">choose file</span> to upload.
                </p>
                <p className="text-[#94A3B8] text-sm">
                  Image format : JPG, PNG & SVG. Max 5.0MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
