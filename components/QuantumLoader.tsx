import React, { useEffect, useState } from 'react';

interface QuantumLoaderProps {
  status: string;
}

export const QuantumLoader: React.FC<QuantumLoaderProps> = ({ status }) => {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const messages = [
      "Initializing Quantum Boltzmann Machine...",
      "Mapping High-Dimensional Hilbert Space...",
      "Fetching Liquid Market Proxies...",
      "Calculating Asset Correlations...",
      "Sampling Gibbs Distribution...",
      "Annealing Price Path Volatility...",
      "Verifying Tangibility Ratio Constraints...",
      "Synthesizing Valuation Report..."
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length) {
        setLog(prev => [messages[currentIndex], ...prev].slice(0, 5));
        currentIndex++;
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl border border-cyan-500/30 p-8 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      {/* Central Spinner */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-t-4 border-cyan-400 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-4 border-violet-500 rounded-full animate-spin reverse" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-400">Q</span>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 animate-pulse">{status}</h3>
      
      {/* Terminal Log */}
      <div className="w-full max-w-md bg-black/50 rounded-lg p-4 font-mono text-xs border border-slate-800 h-32 overflow-hidden flex flex-col-reverse">
        {log.map((line, i) => (
          <div key={i} className={`mb-1 ${i === 0 ? 'text-cyan-400' : 'text-slate-500'}`}>
            <span className="mr-2 opacity-50">{`>`}</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};