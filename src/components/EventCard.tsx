import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { Event, useStore } from '../store/useStore';

export default function EventCard({ event, view }: { event: Event, view: 'grid' | 'list' }) {
  const { watchlist, toggleWatchlist } = useStore();
  const isWatched = watchlist.includes(event.id);

  if (view === 'list') {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-6 hover:border-indigo-500/50 transition-all group">
        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <img src={event.bannerUrl} className="w-full h-full object-cover" alt={event.name} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{event.location.continent}</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{format(new Date(event.dates.start), 'MMM d, yyyy')}</span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{event.name}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
            <span className="flex items-center gap-1"><MapPin size={14} /> {event.location.city}</span>
            <span className="flex items-center gap-1"><Users size={14} /> {event.attendance.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toggleWatchlist(event.id)}
            className={`p-3 rounded-xl border ${isWatched ? 'bg-rose-500/10 border-rose-500/50 text-rose-500' : 'border-slate-700 text-slate-500 hover:text-white'}`}
          >
            <Heart size={20} fill={isWatched ? 'currentColor' : 'none'} />
          </button>
          <Link 
            to={`/event/${event.id}`} 
            className="px-6 py-3 bg-slate-800 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all"
          >
            Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500 transition-all group">
      <div className="relative h-48">
        <img src={event.bannerUrl} className="w-full h-full object-cover" alt={event.name} />
        <button 
          onClick={() => toggleWatchlist(event.id)}
          className="absolute top-4 right-4 p-2 bg-slate-950/50 backdrop-blur-md rounded-full text-white hover:text-rose-500 transition-colors"
        >
          <Heart size={20} fill={isWatched ? '#f43f5e' : 'none'} className={isWatched ? 'text-rose-500' : ''} />
        </button>
        <div className="absolute bottom-4 left-4 flex gap-2">
          {event.tags.slice(0, 2).map(tag => (
            <span key={tag} className="bg-slate-950/80 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded-md text-slate-200 uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{event.name}</h3>
            <p className="text-slate-400 text-sm flex items-center gap-1">
              <MapPin size={14} /> {event.location.city}, {event.location.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-indigo-400 font-bold text-sm">{format(new Date(event.dates.start), 'MMM d')}</p>
            <p className="text-slate-500 text-xs">{format(new Date(event.dates.start), 'yyyy')}</p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span>Hype Meter</span>
            <span>{Math.round((event.attendance / 15000) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${Math.min((event.attendance / 15000) * 100, 100)}%` }}
            />
          </div>
        </div>

        <Link 
          to={`/event/${event.id}`} 
          className="block w-full py-3 bg-slate-800 hover:bg-indigo-600 text-center text-white font-bold rounded-xl transition-all"
        >
          View Event
        </Link>
      </div>
    </div>
  );
}