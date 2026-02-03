import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '../store/useStore';

export default function CalendarView({ events }: { events: Event[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">{format(currentMonth, 'MMMM yyyy')}</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const dayEvents = events.filter(e => isSameDay(new Date(e.dates.start), day));
          return (
            <div 
              key={day.toString()} 
              className={`min-h-[120px] p-2 border-r border-b border-slate-800 transition-colors hover:bg-slate-800/30 ${
                idx % 7 === 6 ? 'border-r-0' : ''
              }`}
            >
              <span className={`text-sm font-medium ${isSameMonth(day, currentMonth) ? 'text-slate-300' : 'text-slate-700'}`}>
                {format(day, 'd')}
              </span>
              <div className="mt-2 space-y-1">
                {dayEvents.map(e => (
                  <div key={e.id} className="text-[10px] bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 p-1 rounded truncate font-bold">
                    {e.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}