import {Github} from 'lucide-react'
export default function Navbar({ onReset }) {
  return (
    <nav className="p-8 flex justify-between items-start w-full bg-transparent">
      <div className="text-2xl leading-tight font-black text-slate-900 cursor-pointer" onClick={onReset}>
        FAVI<br />CRAFT<br />CO.
      </div>
      <div className="flex gap-4 items-center">
        <button className="font-bold tracking-widest hover:scale-105 transition">
         <Github className='text-black' size={30} />
        </button>
      </div>
    </nav>
  );
}
