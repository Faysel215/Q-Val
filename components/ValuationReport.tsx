import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine
} from 'recharts';
import { ValuationResult, AssetParams } from '../types';

interface ValuationReportProps {
  result: ValuationResult;
  asset: AssetParams;
  onReset: () => void;
}

export const ValuationReport: React.FC<ValuationReportProps> = ({ result, asset, onReset }) => {
  const isSukukTradable = result.tangibilityRatio >= 51;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-xl text-xs">
          <p className="text-slate-300 font-bold mb-1">Month {label}</p>
          <p className="text-cyan-400">Val: {payload[0].value.toLocaleString()} {asset.currency}</p>
          <p className="text-violet-400">Bound: {payload[1].value.toLocaleString()} - {payload[0].payload.upperBound.toLocaleString()}</p>
          <p className="text-slate-500 mt-1">Corr: {payload[0].payload.proxyCorrelation.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <svg className="w-16 h-16 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.4z"/></svg>
          </div>
          <p className="text-slate-400 text-xs font-medium uppercase">Final Valuation</p>
          <p className="text-2xl font-bold text-white mt-1">
            {asset.currency} {result.finalValuation.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
          <p className={`text-xs mt-2 ${result.finalValuation >= asset.initialValue ? 'text-green-400' : 'text-red-400'}`}>
            {((result.finalValuation - asset.initialValue) / asset.initialValue * 100).toFixed(2)}% Growth
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs font-medium uppercase">Volatility (Annual)</p>
          <div className="flex items-end space-x-2 mt-1">
            <p className="text-2xl font-bold text-white">{result.volatility}%</p>
            <span className="text-xs text-slate-500 mb-1">Risk Metric</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className={`h-full rounded-full ${result.volatility > 15 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(result.volatility * 3, 100)}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs font-medium uppercase">Tangibility Ratio</p>
          <div className="flex items-end space-x-2 mt-1">
            <p className="text-2xl font-bold text-white">{result.tangibilityRatio}%</p>
            {isSukukTradable ? (
              <span className="text-xs text-green-400 font-bold border border-green-500/30 bg-green-500/10 px-1.5 py-0.5 rounded">TRADABLE</span>
            ) : (
               <span className="text-xs text-red-400 font-bold border border-red-500/30 bg-red-500/10 px-1.5 py-0.5 rounded">NON-TRADABLE</span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-2">Target &gt; 51% for Sukuk</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
           <p className="text-slate-400 text-xs font-medium uppercase">QML Confidence</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-violet-600 bg-violet-200">
                    {result.confidenceScore}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-violet-200/10">
                <div style={{ width: `${result.confidenceScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-violet-500"></div>
              </div>
            </div>
             <p className="text-xs text-slate-500 -mt-2">Based on {result.proxyUsed}</p>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Synthetic Price Path Simulation</h3>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center"><span className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></span> Mean Price</div>
              <div className="flex items-center"><span className="w-3 h-3 bg-violet-500/30 rounded-full mr-2"></span> Uncertainty Bounds</div>
            </div>
          </div>
          
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.pricePath} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" tick={{fontSize: 12}} tickFormatter={(val) => `M${val}`} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 12}} domain={['auto', 'auto']} tickFormatter={(val) => `${(val/1000000).toFixed(1)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="upperBound" stroke="none" fill="url(#colorBound)" />
                <Area type="monotone" dataKey="lowerBound" stroke="none" fill="transparent" /> 
                <Line type="monotone" dataKey="syntheticPrice" stroke="#06b6d4" strokeWidth={3} dot={false} activeDot={{ r: 8 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Commentary & Details */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl h-full">
             <h3 className="text-lg font-semibold text-white mb-4">Mark-to-Model Commentary</h3>
             <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-slate-300 leading-relaxed mb-4">
                  {result.marketCommentary}
                </p>
             </div>
             
             <div className="mt-6 space-y-3">
               <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                 <p className="text-xs text-slate-500 uppercase">Proxy Used</p>
                 <p className="text-sm text-cyan-400 font-mono">{result.proxyUsed}</p>
               </div>
               <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                 <p className="text-xs text-slate-500 uppercase">Asset Class</p>
                 <p className="text-sm text-white font-mono">{asset.type} / {asset.region}</p>
               </div>
               <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                 <p className="text-xs text-slate-500 uppercase">Tenure</p>
                 <p className="text-sm text-white font-mono">{asset.tenureYears} Years ({asset.tenureYears * 12} Months)</p>
               </div>
             </div>

             <button 
              onClick={onReset}
              className="w-full mt-6 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
             >
               Start New Simulation
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};