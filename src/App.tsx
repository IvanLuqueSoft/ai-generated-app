import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import ModeSelector from './components/ModeSelector';
import TypingEngine from './components/TypingEngine';
import ResultsScreen from './components/ResultsScreen';
import { AnimatePresence, motion } from 'framer-motion';
import { TestConfig, TestResults } from './types';

export default function App() {
  const [config, setConfig] = useState({ mode: 'time', value: 30 } as TestConfig);
  const [results, setResults] = useState(null as TestResults | null);
  const [isTyping, setIsTyping] = useState(false);

  const handleComplete = useCallback((res: TestResults) => {
    setResults(res);
    setIsTyping(false);
  }, []);

  const handleRestart = useCallback(() => {
    setResults(null);
    setIsTyping(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono selection:bg-cyan-500/30 flex flex-col">
      <motion.div 
        animate={{ opacity: isTyping ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="z-20"
      >
        <Navbar />
      </motion.div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!results ? (
            <motion.div
              key="engine"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-5xl"
            >
              <div className="mb-8 flex justify-center">
                <motion.div animate={{ opacity: isTyping ? 0 : 1 }}>
                  <ModeSelector config={config} setConfig={setConfig} disabled={isTyping} />
                </motion.div>
              </div>
              <TypingEngine 
                config={config} 
                onComplete={handleComplete} 
                onTypingStateChange={setIsTyping}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl"
            >
              <ResultsScreen results={results} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-8 text-center text-slate-600 text-sm">
        <p>Press <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Tab + Enter</span> to restart</p>
      </footer>
    </div>
  );
}