import { useStore } from '../store/useStore';
import { X } from 'lucide-react';

export default function FilterDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { filters, setFilters } = useStore();

  const continents = ['North America', 'Europe', 'Asia', 'Oceania', 'South America', 'Africa'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-slate-900 h-full shadow-2xl p-8 border-l border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Continents</h3>
            <div className="grid grid-cols-2 gap-3">
              {continents.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    const newContinents = filters.continents.includes(c)
                      ? filters.continents.filter(item => item !== c)
                      : [...filters.continents, c];
                    setFilters({ continents: newContinents });
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    filters.continents.includes(c)
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Preferences</h3>
            <label className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl cursor-pointer group">
              <span className="text-slate-300 font-medium">Hide Past Events</span>
              <input 
                type="checkbox" 
                checked={filters.hidePast}
                onChange={e => setFilters({ hidePast: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-slate-800 rounded-2xl cursor-pointer group">
              <span className="text-slate-300 font-medium">Registration Open Only</span>
              <input 
                type="checkbox" 
                checked={filters.regOpenOnly}
                onChange={e => setFilters({ regOpenOnly: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute bottom-8 left-8 right-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
        >
          Show Results
        </button>
      </div>
    </div>
  );
}