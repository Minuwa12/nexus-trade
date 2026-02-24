export default function MultiverseEnginePage() {
  // Mock data showing alternative realities of past trades
  const simulations = [
    { 
      id: 'TRD-089', 
      ticker: 'NQ (Nasdaq)', 
      actualPnl: 905.00, 
      optimalPnl: 2450.00, 
      mistake: 'Premature Exit', 
      aiInsight: 'You exited at minor resistance. Order flow showed heavy institutional buying. Holding to the next major liquidity node would have yielded +$1,545.00 more.' 
    },
    { 
      id: 'TRD-088', 
      ticker: 'AAPL', 
      actualPnl: -450.00, 
      optimalPnl: 850.00, 
      mistake: 'Tight Stop Loss', 
      aiInsight: 'Stop loss placed exactly at the liquidity sweep zone. An ATR-based stop would have survived the wick and caught the reversal.' 
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Page Header */}
      <div className="border-b border-red-950/50 pb-6 relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-600/10 blur-[60px] pointer-events-none"></div>
        <h1 className="text-3xl font-black text-gray-200 tracking-widest uppercase drop-shadow-md">
          Multiverse <span className="text-amber-600">Engine</span>
        </h1>
        <p className="text-gray-500 font-medium text-sm tracking-wide mt-2">
          Monte Carlo simulations of your closed positions. Revealing the cost of your hesitation.
        </p>
      </div>

      {/* Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-red-950/60 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-800"></div>
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Capital Left on Table (30D)</p>
          <h3 className="text-4xl font-black text-red-600 mt-2">-$14,250.00</h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">Primarily due to: <span className="text-amber-500">Premature Exits</span></p>
        </div>
        
        <div className="bg-[#0a0a0a] border border-amber-900/40 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-600"></div>
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Alpha Timeline Potential</p>
          <h3 className="text-4xl font-black text-amber-500 mt-2">+$28,400.00</h3>
          <p className="text-xs text-gray-400 mt-2 font-medium">If AI-optimized exits were executed</p>
        </div>
      </div>

      {/* Alternate Realities Feed */}
      <h3 className="text-lg font-bold text-gray-300 tracking-wide uppercase mt-10">Divergent Timelines</h3>
      
      <div className="space-y-6">
        {simulations.map((sim, index) => (
          <div key={index} className="bg-[#050505] border border-red-950/40 rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:border-red-900/80 transition duration-500 shadow-lg relative overflow-hidden">
            
            {/* Left side: Actual vs Optimal */}
            <div className="md:w-1/3 border-r border-red-950/30 pr-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-400">{sim.ticker}</span>
                <span className="text-xs font-mono text-gray-600">{sim.id}</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider font-bold">Actual Timeline</p>
                  <p className={`text-xl font-black font-mono ${sim.actualPnl > 0 ? 'text-gray-300' : 'text-red-700'}`}>
                    {sim.actualPnl > 0 ? '+' : ''}${Math.abs(sim.actualPnl).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-amber-700 uppercase tracking-wider font-bold">Alpha Timeline</p>
                  <p className="text-xl font-black font-mono text-amber-500">
                    +${sim.optimalPnl.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: AI Analysis */}
            <div className="md:w-2/3 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 bg-red-950/30 border border-red-900/50 rounded-md text-red-500 text-xs font-bold uppercase tracking-widest w-max mb-3">
                Error: {sim.mistake}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-amber-600 font-bold">System Override: </span> 
                {sim.aiInsight}
              </p>
              
              <button className="mt-4 text-xs font-bold text-gray-500 hover:text-amber-500 transition self-start flex items-center gap-2 uppercase tracking-widest">
                View 3D Liquidity Replay <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}