import { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import EventCard from '../components/EventCard';
import CalendarView from '../components/CalendarView';
import FilterDrawer from '../components/FilterDrawer';
import { LayoutGrid, List, Calendar as CalendarIcon, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function Dashboard() {
  const { events, filters } = useStore();
  const [view, setView] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      if (e.isPending) return false;
      const matchesSearch = e.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           e.location.city.toLowerCase().includes(filters.search.toLowerCase());
      const matchesContinent = filters.continents.length === 0 || filters.continents.includes(e.location.continent);
      const isPast = new Date(e.dates.end) < new Date();
      if (filters.hidePast && isPast) return false;
      return matchesSearch && matchesContinent;
    });
  }, [events, filters]);

  const featuredCon = events[0];
  const daysUntil = differenceInDays(new Date(featuredCon.dates.start), new Date());

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-64 rounded-3xl overflow-hidden group">
        <img 
          src={featuredCon.bannerUrl} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
              Featured Event
            </span>
            <span className="text-slate-300 text-sm font-medium">{daysUntil} days remaining</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">{featuredCon.name}</h2>
          <p className="text-slate-300 max-w-md line-clamp-2">{featuredCon.description}</p>
        </div>
        <button className="absolute bottom-8 right-8 bg-white text-slate-950 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all">
          View Details <ArrowRight size={18} />
        </button>
      </section>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setView('grid')} 
            className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-slate-800 text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setView('list')} 
            className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-slate-800 text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <List size={20} />
          </button>
          <button 
            onClick={() => setView('calendar')} 
            className={`p-2 rounded-lg transition-all ${view === 'calendar' ? 'bg-slate-800 text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <CalendarIcon size={20} />
          </button>
        </div>

        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:border-indigo-500 transition-all"
        >
          <SlidersHorizontal size={18} />
          <span className="font-medium">Filters</span>
          {filters.continents.length > 0 && (
            <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] flex items-center justify-center rounded-full">
              {filters.continents.length}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      {view === 'calendar' ? (
        <CalendarView events={filteredEvents} />
      ) : (
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} view={view} />
          ))}
        </div>
      )}

      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
}