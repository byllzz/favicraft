'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DropzoneSection from '@/components/DropzoneSection';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import ExportDashboard from '@/components/ExportDashboard';
import HowItWorks from '@/components/HowItWorks';

export default function FaviconGenerator() {
  // state: tracking file & visual preview
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // handler: process upload & scroll to top
  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // config: dropzone restriction & hooks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  // action: clear workspace
  const handleReset = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-[#FF6B35] p-4 md:p-8 font-serif uppercase tracking-tight selection:bg-orange-200">
      <div className="bg-[#FDF8F1] rounded-sm shadow-2xl relative transition-all duration-700">
        <Navbar onReset={handleReset} />

        {/* toggle: big hero vs mini header */}
        {!file ? (
          <section className="min-h-[70vh] flex items-center justify-center px-8 animate-in fade-in duration-700">
            <Hero />
          </section>
        ) : (
          <section className="pt-20 pb-10 flex flex-col items-center justify-center px-8 animate-in slide-in-from-top-4 duration-1000">
            <span className="text-[10px] font-black tracking-[0.5em] text-orange-500 mb-4">Workspace Active</span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tighter italic text-center leading-none">
              Refining your <br /> visual identity
            </h1>
            <div className="mt-8 h-[1px] w-24 bg-zinc-200" />
          </section>
        )}

        {/* core: upload area vs result dashboard */}
        {!file ? (
          <DropzoneSection
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            preview={preview}
            file={file}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-8 pb-32 animate-in fade-in zoom-in-95 duration-700">
            <ExportDashboard
              file={file}
              preview={preview}
              onReset={handleReset}
            />
          </div>
        )}

        {/* extra: hide guide when working */}
        {!file && (
          <div className="animate-in fade-in duration-1000">
            <HowItWorks />
          </div>
        )}

        {/* info: common questions */}
        <div className="max-w-7xl mx-auto px-8">
          <Faq />
        </div>

        <Footer />
      </div>
    </div>
  );
}
