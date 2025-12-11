import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Q-Val</h1>
            <p className="text-xs text-slate-400 font-mono">Synthetic Illiquid Asset Pricer</p>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-4 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-cyan-400 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Portfolios</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Audit Logs</a>
          </nav>
          <div className="h-6 w-px bg-slate-700"></div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
             <span className="w-2 h-2 rounded-full bg-green-500"></span>
             <span>System Operational</span>
          </div>
        </div>
      </div>
    </header>
  );
};