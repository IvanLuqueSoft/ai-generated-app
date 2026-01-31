import React from 'react';
import { LineChart } from 'recharts';
import { Line } from 'recharts';
import { XAxis } from 'recharts';
import { YAxis } from 'recharts';
import { CartesianGrid } from 'recharts';
import { Tooltip } from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { RefreshCw } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { Trophy } from 'lucide-react';
import { TestResults } from '../types';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: React.ReactNode;
}

function StatCard({ label, value, color = "text-slate-100", icon }: StatCardProps) {
  return (
    <div className="bg-slate-900/30 border border-slate-800/50 p-4 rounded-2xl">
      <p className="text-slate-500 text-xs uppercase tracking-widest mb-1 flex items-center gap-2">
        {label} {icon}
      </p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

interface Props {
  results: TestResults;
  onRestart: () => void;
}

export default function ResultsScreen({ results, onRestart }: Props) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 flex flex-col justify-center space-y-8">
          <div>
            <p className="text-slate-500 text-sm uppercase tracking-widest mb-1">WPM</p>
            <h2 className="text-7xl font-bold text-cyan-400">{results.wpm}</h2>
          </div>
          <div>
            <p className="text-slate-500 text-sm uppercase tracking-widest mb-1">Accuracy</p>
            <h2 className="text-5xl font-bold text-slate-100">{results.accuracy}%</h2>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={onRestart}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 py-3 px-6 rounded-xl transition-all"
            >
              <RefreshCw size={18} />
              Restart
            </button>
            <button className="flex items-center justify-center gap-2 border border-slate-800 hover:bg-slate-900 text-slate-400 py-3 px-6 rounded-xl transition-all">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </div>

        <div className="md:col-span-3 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={results.history}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#475569" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#475569" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#22d3ee' }}
              />
              <Line 
                type="monotone" 
                dataKey="wpm" 
                stroke="#22d3ee" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#22d3ee', strokeWidth: 0 }} 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Raw WPM" value={results.rawWpm} />
        <StatCard label="Errors" value={results.errors} color="text-rose-500" />
        <StatCard label="Consistency" value="84%" />
        <StatCard label="Rank" value="Top 12%" icon={<Trophy size={14} className="text-yellow-500" />} />
      </div>
    </div>
  );
}