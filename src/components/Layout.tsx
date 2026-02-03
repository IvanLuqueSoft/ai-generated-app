import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, PlusCircle, ShieldCheck, Search, Menu, Bell } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { filters, setSearch } = useStore();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/submit', icon: PlusCircle, label: 'Submit' },
    { path: '/admin', icon: ShieldCheck, label: 'Admin' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 fixed h-full">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
            FC
          </div>
          <h1 className="font-bold text-xl tracking-tight">FurCon Central</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
          <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">Community</p>
          <p className="text-sm text-slate-300">Join 12,000+ attendees tracking their next adventure.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-950/70 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Search conventions, cities, or tags..."
              className="w-full bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500" />
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 flex justify-around py-3 px-6 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-indigo-400' : 'text-slate-500'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-bold uppercase">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}