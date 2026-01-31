import React from 'react';
import { Timer, Type, Code } from 'lucide-react';
import { TestConfig, TestMode } from '../types';

interface Props {
  config: TestConfig;
  setConfig: (c: TestConfig) => void;
  disabled?: boolean;
}

export default function ModeSelector({ config, setConfig, disabled }: Props) {
  const modes = [
    { id: 'time' as TestMode, icon: Timer, label: 'time' },
    { id: 'words' as TestMode, icon: Type, label: 'words' },
    { id: 'code' as TestMode, icon: Code, label: 'code' },
  ];

  const values = config.mode === 'time' ? [15, 30, 60] : [25, 50, 100];

  return (
    <div className={`flex items-center gap-2 bg-slate-900/50 backdrop-blur-md border border-slate-800 p-1.5 rounded-2xl transition-opacity ${disabled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex items-center border-r border-slate-800 pr-2 mr-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setConfig({ mode: m.id, value: m.id === 'time' ? 30 : 50 })}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              config.mode === m.id ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <m.icon size={16} />
            <span className="text-sm font-bold">{m.label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center">
        {values.map((v) => (
          <button
            key={v}
            onClick={() => setConfig({ ...config, value: v })}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              config.value === v ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}