export default function Footer() {
  return (
    <footer className="bg-slate-900 text-[#FDF8F1] p-8 md:p-16 mt-24 rounded-sm">
      <div className="space-y-20">
        {/* call to action */}
        <div className="text-center space-y-8">
          <h2 className="text-7xl md:text-[12rem] font-black leading-none tracking-tighter">
            READY?
          </h2>
          <p className="font-sans text-xs tracking-[0.4em]">START BUILDING YOUR LEGACY</p>
        </div>

        {/* bottom: all links */}
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-slate-800 pt-12 gap-8">
          <div className="space-y-4">
            <div className="text-2xl font-black">FAVICRAFT CO.</div>
            <p className="text-[10px] text-slate-500 font-sans">© 2026 ALL RIGHTS RESERVED</p>
          </div>

          <div className="flex gap-12 font-sans text-[10px] tracking-widest font-bold">
            <div className="flex flex-col gap-2">
              <span className="text-slate-600">SOCIAL</span>
              <a href="#" className="hover:text-orange-500">TWITTER</a>
              <a href="#" className="hover:text-orange-500">INSTAGRAM</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-slate-600">LEGAL</span>
              <a href="#" className="hover:text-orange-500">PRIVACY</a>
              <a href="#" className="hover:text-orange-500">TERMS</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
