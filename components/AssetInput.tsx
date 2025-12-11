import React, { useState } from 'react';
import { AssetParams, AssetType, Region } from '../types';

interface AssetInputProps {
  onSubmit: (params: AssetParams) => void;
  isLoading: boolean;
}

export const AssetInput: React.FC<AssetInputProps> = ({ onSubmit, isLoading }) => {
  const [params, setParams] = useState<AssetParams>({
    name: 'Downtown Commercial Tower A',
    type: AssetType.REAL_ESTATE,
    region: Region.MENA,
    initialValue: 50000000,
    currency: 'USD',
    tenureYears: 5,
    description: 'Grade A commercial office space in central financial district with 90% occupancy.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: name === 'initialValue' || name === 'tenureYears' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Asset Parameters
        </h2>
        <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-700">Input Phase</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Asset Name</label>
            <input
              type="text"
              name="name"
              required
              value={params.name}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
            />
          </div>
          <div>
             <label className="block text-xs font-medium text-slate-400 mb-1">Asset Type</label>
             <select
               name="type"
               value={params.type}
               onChange={handleChange}
               className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
             >
               {Object.values(AssetType).map(t => <option key={t} value={t}>{t}</option>)}
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label className="block text-xs font-medium text-slate-400 mb-1">Region</label>
             <select
               name="region"
               value={params.region}
               onChange={handleChange}
               className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
             >
               {Object.values(Region).map(r => <option key={r} value={r}>{r}</option>)}
             </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Initial Value ({params.currency})</label>
            <input
              type="number"
              name="initialValue"
              min="0"
              required
              value={params.initialValue}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
            />
          </div>
           <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Tenure (Years)</label>
            <input
              type="number"
              name="tenureYears"
              min="1"
              max="30"
              required
              value={params.tenureYears}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Contextual Description</label>
          <textarea
            name="description"
            rows={3}
            required
            value={params.description}
            onChange={handleChange}
            placeholder="Describe factors affecting valuation (location, condition, tenants...)"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center space-x-2 ${
            isLoading 
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-900/20'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Initiating Quantum Pricing Protocol...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Run Valuation Simulation</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};