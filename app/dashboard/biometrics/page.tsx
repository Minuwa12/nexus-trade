'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function BiometricTiltPage() {
  // Mock heart rate data correlating to a trading session
  const heartRateData = [
    { time: '09:00', bpm: 72, event: 'Pre-market' },
    { time: '09:30', bpm: 85, event: 'Market Open' },
    { time: '09:45', bpm: 88, event: 'Scanning' },
    { time: '10:05', bpm: 115, event: 'Entered TRD-087' },
    { time: '10:15', bpm: 128, event: 'Drawdown / Tilt' }, // Massive spike
    { time: '10:30', bpm: 135, event: 'Revenge Trade TRD-088' }, // Peak tilt
    { time: '11:00', bpm: 95, event: 'Position Closed' },
    { time: '11:30', bpm: 82, event: 'Recovery' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto mt-6">
      
      {/* Page Header */}
      <div className="border-b border-red-950/50 pb-6 relative">
        <h1 className="text-3xl font-black text-gray-200 tracking-widest uppercase drop-shadow-md">
          Physiological <span className="text-red-700">Tilt</span>
        </h1>
        <p className="text-gray-500 font-medium text-sm tracking-wide mt-2">
          Nervous system monitoring. Correlating heart rate variability (HRV) with capital destruction.
        </p>
      </div>

      {/* Biometric HUD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#050505] border border-red-950/40 rounded-xl p-6 shadow-xl">
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Resting Baseline</p>
          <h3 className="text-4xl font-black text-gray-300 mt-2 font-mono">72 <span className="text-lg text-gray-600">BPM</span></h3>
          <p className="text-xs text-emerald-700 mt-2 font-bold uppercase tracking-widest">Optimal State</p>
        </div>
        
        <div className="bg-[#050505] border border-red-900/60 rounded-xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-700 animate-pulse"></div>
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Peak Execution Stress</p>
          <h3 className="text-4xl font-black text-red-600 mt-2 font-mono">135 <span className="text-lg text-red-900">BPM</span></h3>
          <p className="text-xs text-red-500 mt-2 font-bold uppercase tracking-widest">Danger: Fight or Flight</p>
        </div>

        <div className="bg-[#050505] border border-amber-900/40 rounded-xl p-6 shadow-xl">
          <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Tilt Probability</p>
          <h3 className="text-4xl font-black text-amber-500 mt-2 font-mono">84%</h3>
          <p className="text-xs text-amber-700 mt-2 font-bold uppercase tracking-widest">Do not execute trades</p>
        </div>
      </div>

      {/* The ECG Chart Area */}
      <div className="bg-[#0a0a0a] border border-red-950/60 rounded-xl p-8 shadow-2xl relative">
        <div className="absolute inset-0 bg-red-900/5 blur-[100px] pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h3 className="text-lg font-bold text-gray-300 tracking-wide uppercase">Live Session ECG</h3>
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mt-1">Apple Watch Series 9 Synced</p>
          </div>
          <div className="flex items-center space-x-2 border border-red-900/30 px-3 py-1 bg-red-950/10 rounded text-red-500 text-xs font-bold uppercase tracking-widest animate-pulse">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span>Recording</span>
          </div>
        </div>
        
        {/* Recharts Heart Rate Monitor */}
        <div className="h-72 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={heartRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <ReferenceLine y={110} label={{ position: 'top', value: 'TILT THRESHOLD', fill: '#991b1b', fontSize: 10, fontWeight: 'bold' }} stroke="#991b1b" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#050505', borderColor: '#450a0a', color: '#f3f4f6', borderRadius: '8px' }}
                itemStyle={{ color: '#dc2626', fontWeight: 'bold' }}
                labelStyle={{ color: '#6b7280', fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="bpm" 
                stroke="#dc2626" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorBpm)" 
                activeDot={{ r: 6, fill: '#ef4444', stroke: '#050505', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Correlation Log */}
        <div className="mt-8 border-t border-red-950/50 pt-6">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">AI Event Correlation</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm bg-[#050505] border border-red-950/30 p-3 rounded">
              <span className="text-gray-400 font-mono">10:15 AM</span>
              <span className="text-gray-300 font-bold tracking-wide">Heart rate exceeded 120 BPM.</span>
              <span className="text-red-600 font-bold uppercase text-xs">Cortisol Spike / Drawdown</span>
            </div>
            <div className="flex items-center justify-between text-sm bg-[#050505] border border-red-950/30 p-3 rounded">
              <span className="text-gray-400 font-mono">10:30 AM</span>
              <span className="text-gray-300 font-bold tracking-wide">Executed Trade TRD-088 during peak stress.</span>
              <span className="text-amber-500 font-bold uppercase text-xs">Revenge Trade Flagged</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}