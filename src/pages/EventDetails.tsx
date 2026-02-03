import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { MapPin, Calendar, Users, Globe, Share2, Heart, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, watchlist, toggleWatchlist } = useStore();
  
  const event = events.find(e => e.id === id);
  if (!event) return <div className="p-10 text-center">Event not found</div>;

  const isWatched = watchlist.includes(event.id);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium"
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="relative h-[400px] rounded-[40px] overflow-hidden">
        <img src={event.bannerUrl} className="w-full h-full object-cover" alt={event.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
          <div>
            <div className="flex gap-2 mb-4">
              {event.tags.map(tag => (
                <span key={tag} className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-black text-white">{event.name}</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => toggleWatchlist(event.id)}
              className={`p-4 rounded-2xl backdrop-blur-md border transition-all ${
                isWatched ? 'bg-rose-500 border-rose-400 text-white' : 'bg-slate-950/50 border-slate-700 text-white hover:bg-slate-950'
              }`}
            >
              <Heart size={24} fill={isWatched ? 'white' : 'none'} />
            </button>
            <button className="p-4 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-950 transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">
            <h2 className="text-2xl font-bold text-white mb-4">About the Event</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              {event.description}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center">
              <Users className="text-indigo-400 mb-2" size={32} />
              <span className="text-2xl font-bold text-white">{event.attendance.toLocaleString()}</span>
              <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Expected Attendees</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center">
              <CheckCircle2 className="text-emerald-400 mb-2" size={32} />
              <span className="text-2xl font-bold text-white">Confirmed</span>
              <span className="text-slate-500 text-sm font-bold uppercase tracking-widest">Event Status</span>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-400">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Date & Time</p>
                <p className="text-white font-bold">{format(new Date(event.dates.start), 'MMMM d')} - {format(new Date(event.dates.end), 'd, yyyy')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Location</p>
                <p className="text-white font-bold">{event.location.city}, {event.location.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
                <Globe size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Registration</p>
                <p className="text-white font-bold">Opens {format(new Date(event.dates.reg_open), 'MMMM yyyy')}</p>
              </div>
            </div>

            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
              Official Website
            </button>
            <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all">
              Add to Calendar (.ics)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}