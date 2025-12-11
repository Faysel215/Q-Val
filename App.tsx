import React, { useState } from 'react';
import { Header } from './components/Header';
import { AssetInput } from './components/AssetInput';
import { QuantumLoader } from './components/QuantumLoader';
import { ValuationReport } from './components/ValuationReport';
import { AssetParams, ValuationResult, SimulationState } from './types';
import { generateSyntheticValuation } from './services/geminiService';

const App: React.FC = () => {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    status: 'IDLE',
    progress: 0,
  });
  
  const [assetParams, setAssetParams] = useState<AssetParams | null>(null);
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);

  const handleStartSimulation = async (params: AssetParams) => {
    setAssetParams(params);
    setSimulationState({ status: 'THINKING', progress: 10 });
    
    try {
      // Small delay to let the UI update and show the loader transition
      await new Promise(resolve => setTimeout(resolve, 500));
      setSimulationState({ status: 'GENERATING', progress: 30 });
      
      const result = await generateSyntheticValuation(params);
      
      setValuationResult(result);
      setSimulationState({ status: 'COMPLETE', progress: 100 });
    } catch (error) {
      console.error(error);
      setSimulationState({ status: 'ERROR', progress: 0, message: "Simulation Failed" });
    }
  };

  const handleReset = () => {
    setSimulationState({ status: 'IDLE', progress: 0 });
    setAssetParams(null);
    setValuationResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-cyan-500/30">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
           <h2 className="text-3xl font-bold text-white tracking-tight">
             {simulationState.status === 'COMPLETE' 
               ? `Valuation Report: ${assetParams?.name}`
               : 'Synthetic Illiquid Asset Pricing'}
           </h2>
           <p className="text-slate-400 mt-2 max-w-2xl">
             {simulationState.status === 'COMPLETE'
               ? `Generated via QML Mark-to-Model Protocol using ${valuationResult?.proxyUsed} as correlation anchor.`
               : 'Leverage Quantum Boltzmann Machines to generate defensible price paths for Real Estate and Infrastructure assets backing Islamic contracts.'}
           </p>
        </div>

        {simulationState.status === 'IDLE' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AssetInput onSubmit={handleStartSimulation} isLoading={false} />
            </div>
            
            <div className="space-y-6">
               {/* Info Card */}
               <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                 <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">System Capabilities</h4>
                 <ul className="space-y-3 text-sm text-slate-400">
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     <span>Synthetic Price Path Generation using Gibbs Sampling</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     <span>Tangibility Ratio Verification for Sukuk Structuring</span>
                   </li>
                   <li className="flex items-start">
                     <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                     <span>Liquid Market Proxy Correlation Analysis</span>
                   </li>
                 </ul>
               </div>

               <div className="bg-gradient-to-br from-indigo-900/50 to-violet-900/50 rounded-xl p-6 border border-violet-500/20">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Why Q-Val?</h4>
                  <p className="text-xs text-indigo-200 leading-relaxed">
                    Traditional valuation lags real market movements. Q-Val provides a continuous "Mark-to-Model" approach, essential for maintaining the 51% Tangibility Ratio required for Sukuk tradability in secondary markets.
                  </p>
               </div>
            </div>
          </div>
        )}

        {(simulationState.status === 'THINKING' || simulationState.status === 'GENERATING') && (
           <div className="max-w-3xl mx-auto py-12">
             <QuantumLoader status={simulationState.status === 'THINKING' ? 'Initializing Parameters...' : 'Running Quantum Simulation...'} />
           </div>
        )}

        {simulationState.status === 'COMPLETE' && valuationResult && assetParams && (
           <ValuationReport result={valuationResult} asset={assetParams} onReset={handleReset} />
        )}

        {simulationState.status === 'ERROR' && (
          <div className="max-w-md mx-auto mt-12 text-center p-8 bg-slate-800 rounded-xl border border-red-500/30">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Simulation Failed</h3>
            <p className="text-slate-400 mb-6">The quantum annealing process encountered a singularity. Please try again.</p>
            <button onClick={handleReset} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors">
              Reset System
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;