import { useStore } from '../store/useStore';
import { Check, X, ShieldAlert } from 'lucide-react';

export default function Admin() {
  const { events, approveEvent } = useStore();
  const pendingEvents = events.filter(e => e.isPending);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
          <ShieldAlert size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-white">Admin Queue</h1>
          <p className="text-slate-400">Review and approve community submissions.</p>
        </div>
      </div>

      {pendingEvents.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-20 text-center">
          <p className="text-slate-500 text-xl font-medium">No pending submissions at this time.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingEvents.map(event => (
            <div key={event.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden">
                  <img src={event.bannerUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{event.name}</h3>
                  <p className="text-slate-400">{event.location.city}, {event.location.country}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  className="p-3 bg-slate-800 text-slate-400 hover:text-rose-500 rounded-xl transition-all"
                  title="Reject"
                >
                  <X size={24} />
                </button>
                <button 
                  onClick={() => approveEvent(event.id)}
                  className="p-3 bg-indigo-600 text-white hover:bg-indigo-500 rounded-xl transition-all"
                  title="Approve"
                >
                  <Check size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}