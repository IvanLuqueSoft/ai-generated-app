import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Send, Info, MapPin, Calendar as CalendarIcon } from 'lucide-react';

export default function SubmitEvent() {
  const navigate = useNavigate();
  const addEvent = useStore(state => state.addEvent);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    country: '',
    continent: 'North America',
    startDate: '',
    endDate: '',
    regDate: '',
    description: '',
    bannerUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      location: { city: formData.city, country: formData.country, continent: formData.continent },
      dates: { start: formData.startDate, end: formData.endDate, reg_open: formData.regDate },
      status: 'tentative',
      tags: ['Community Submission'],
      attendance: 0,
      description: formData.description,
      bannerUrl: formData.bannerUrl
    });
    alert('Event submitted for review!');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-white mb-4">Submit an Event</h1>
        <p className="text-slate-400">Help us keep the community updated by adding new conventions.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden">
        <div className="flex border-b border-slate-800">
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-widest transition-colors ${
                step === s ? 'text-indigo-400 bg-indigo-600/5' : 'text-slate-600'
              }`}
            >
              Step {s}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 mb-4">
                <Info size={20} />
                <h3 className="font-bold">Basic Information</h3>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Convention Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Furry Weekend Atlanta"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Tell us about the event..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-500 mb-4">
                <MapPin size={20} />
                <h3 className="font-bold">Location Details</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">City</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Country</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Continent</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.continent}
                  onChange={e => setFormData({...formData, continent: e.target.value})}
                >
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia</option>
                  <option>Oceania</option>
                  <option>South America</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <CalendarIcon size={20} />
                <h3 className="font-bold">Dates</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Start Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">End Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.endDate}
                    onChange={e => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Registration Opens</label>
                <input 
                  required
                  type="date" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.regDate}
                  onChange={e => setFormData({...formData, regDate: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button 
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 transition-all"
              >
                Next Step
              </button>
            ) : (
              <button 
                type="submit"
                className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} /> Submit for Review
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}