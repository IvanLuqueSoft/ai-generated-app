import React from 'react';
import { Keyboard } from 'lucide-react';
import { BarChart2 } from 'lucide-react';
import { Settings } from 'lucide-react';
import { User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="max-w-5xl mx-auto w-full px-6 py-8 flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="bg-cyan-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
          <Keyboard className="text-slate-950" size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tighter text-slate-100">
          Veloci<span className="text-cyan-400">key</span>
        </h1>
      </div>

      <div className="flex items-center gap-6 text-slate-500">
        <button className="hover:text-cyan-400 transition-colors"><BarChart2 size={20} /></button>
        <button className="hover:text-cyan-400 transition-colors"><Settings size={20} /></button>
        <button className="hover:text-cyan-400 transition-colors"><User size={20} /></button>
      </div>
    </nav>
  );
}