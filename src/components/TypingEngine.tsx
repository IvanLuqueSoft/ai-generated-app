import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TestConfig, TestResults } from '../types';
import { generateWords } from '../utils/wordGenerator';

interface Props {
  config: TestConfig;
  onComplete: (res: TestResults) => void;
  onTypingStateChange: (isTyping: boolean) => void;
}

export default function TypingEngine({ config, onComplete, onTypingStateChange }: Props) {
  const [words, setWords] = useState([] as string[]);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null as number | null);
  const [timeLeft, setTimeLeft] = useState(config.value);
  const [history, setHistory] = useState([] as { time: number; wpm: number }[]);
  const inputRef = useRef(null as HTMLInputElement | null);

  const calculateWpm = useCallback((typed: string, seconds: number) => {
    if (seconds <= 0) return 0;
    const wordsTyped = typed.length / 5;
    return Math.round(wordsTyped / (seconds / 60));
  }, []);

  const finish = useCallback(() => {
    if (!startTime) return;
    const elapsed = (Date.now() - startTime) / 1000;
    const wpm = calculateWpm(input, elapsed);
    
    const fullText = words.join(' ');
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === fullText[i]) correct++;
    }
    const accuracy = Math.round((correct / input.length) * 100) || 0;

    onComplete({
      wpm,
      accuracy,
      history,
      rawWpm: wpm,
      errors: input.length - correct
    });
  }, [startTime, input, words, history, calculateWpm, onComplete]);

  const reset = useCallback(() => {
    const newWords = generateWords(config.mode === 'code' ? 'code' : 'english', config.mode === 'words' ? config.value : 100);
    setWords(newWords);
    setInput('');
    setStartTime(null);
    setTimeLeft(config.value);
    setHistory([]);
    onTypingStateChange(false);
    if (inputRef.current) inputRef.current.focus();
  }, [config, onTypingStateChange]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') e.preventDefault();
      if (e.key === 'Enter' && e.altKey) reset();
      if (inputRef.current) inputRef.current.focus();
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [reset]);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      if (config.mode === 'time') {
        const remaining = Math.max(0, config.value - elapsed);
        setTimeLeft(Math.ceil(remaining));
        if (remaining <= 0) finish();
      }

      const currentWpm = calculateWpm(input, elapsed);
      setHistory(prev => [...prev, { time: Math.round(elapsed), wpm: currentWpm }]);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, input, config, finish, calculateWpm]);

  const handleInput = (e: React.ChangeEvent<any>) => {
    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
      onTypingStateChange(true);
    }

    const fullText = words.join(' ');
    if (val.length <= fullText.length) {
      setInput(val);
    }

    if (config.mode === 'words' && val.length === fullText.length) {
      finish();
    }
  };

  const fullText = words.join(' ');

  return (
    <div className="relative w-full max-w-4xl mx-auto" onClick={() => inputRef.current?.focus()}>
      <div className="flex justify-between items-end mb-4 h-12">
        <div className="text-4xl font-bold text-cyan-400">
          {config.mode === 'time' ? timeLeft : `${input.split(' ').length - 1}/${config.value}`}
        </div>
        {startTime && (
          <div className="flex gap-8 text-slate-500">
            <div><span className="text-xs block uppercase tracking-widest opacity-50">WPM</span><span className="text-2xl">{calculateWpm(input, (Date.now() - startTime) / 1000)}</span></div>
            <div><span className="text-xs block uppercase tracking-widest opacity-50">ACC</span><span className="text-2xl">{input.length > 0 ? Math.round(((input.split('').filter((c, i) => c === fullText[i]).length) / input.length) * 100) : 100}%</span></div>
          </div>
        )}
      </div>

      <div className="relative text-2xl leading-relaxed tracking-wide select-none">
        <input
          ref={inputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none"
          value={input}
          onChange={handleInput}
          autoFocus
        />
        
        <div className="flex flex-wrap gap-x-[0.6em] text-slate-500">
          {words.map((word, wordIdx) => {
            const wordStartIdx = words.slice(0, wordIdx).join(' ').length + (wordIdx > 0 ? 1 : 0);
            return (
              <div key={wordIdx} className="relative flex">
                {word.split('').map((char, charIdx) => {
                  const absoluteIdx = wordStartIdx + charIdx;
                  const isTyped = absoluteIdx < input.length;
                  const isCorrect = isTyped && input[absoluteIdx] === char;
                  const isCurrent = absoluteIdx === input.length;

                  return (
                    <span
                      key={charIdx}
                      className={`relative transition-colors duration-100 ${isTyped ? (isCorrect ? 'text-slate-100' : 'text-rose-500') : ''}`}
                    >
                      {isCurrent && (
                        <motion.div
                          layoutId="caret"
                          className="absolute -left-[1px] top-1 w-[2px] h-[1.2em] bg-cyan-400"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                      )}
                      {char}
                    </span>
                  );
                })}
                {wordIdx < words.length - 1 && (
                  <span className={`relative ${wordStartIdx + word.length < input.length ? (input[wordStartIdx + word.length] === ' ' ? '' : 'bg-rose-500/30') : ''}`}>
                    {wordStartIdx + word.length === input.length && (
                       <motion.div
                       layoutId="caret"
                       className="absolute -left-[1px] top-1 w-[2px] h-[1.2em] bg-cyan-400"
                       animate={{ opacity: [1, 0, 1] }}
                       transition={{ repeat: Infinity, duration: 1 }}
                     />
                    )}
                    &nbsp;
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}