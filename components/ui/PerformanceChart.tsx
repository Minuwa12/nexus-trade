'use client';

import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Activity, ShieldAlert } from 'lucide-react';

interface Trade {
  netPnl: number | null;
  createdAt: Date;
}

export default function PerformanceChart({ trades }: { trades: Trade[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverData, setHoverData] = useState<{ val: number; x: number; isWin: boolean } | null>(null);

  // 1. Advanced Math: Cumulative Equity Journey
  const dataPoints = [0, ...(trades?.length > 0 
    ? trades.slice().reverse().map((_, i, arr) => 
        arr.slice(0, i + 1).reduce((sum, current) => sum + (current.netPnl || 0), 0))
    : [0])];

  const min = Math.min(...dataPoints, 0);
  const max = Math.max(...dataPoints, 100);
  const range = max - min;
  const width = 500;
  const height = 150;

  const points = dataPoints.map((val, i) => {
    const x = (i / (dataPoints.length - 1)) * width;
    const y = height - ((val - min) / (range || 1)) * height;
    return `${x},${y}`;
  }).join(' ');

  // 2. Smooth Spring Physics for the Scanner
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const percentX = xPos / rect.width;
    
    const index = Math.round(percentX * (dataPoints.length - 1));
    const safeIndex = Math.max(0, Math.min(index, dataPoints.length - 1));
    
    const finalX = (safeIndex / (dataPoints.length - 1)) * width;
    mouseX.set(finalX);
    
    setHoverData({
      val: dataPoints[safeIndex],
      x: finalX,
      isWin: safeIndex === 0 ? true : (dataPoints[safeIndex] >= dataPoints[safeIndex - 1])
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverData(null)}
      className="relative h-full w-full bg-[#050505] rounded-3xl border border-red-950/40 overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,1)] cursor-none"
    >
      {/* Dynamic ECG Grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none opacity-[0.03]">
        {[...Array(72)].map((_, i) => <div key={i} className="border-[0.5px] border-red-500"></div>)}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full p-8 overflow-visible">
        {/* Glow Path */}
        <motion.path
          d={`M 0 ${height} L ${points} L ${width} ${height} Z`}
          fill="url(#eliteGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
        />

        {/* The Main "Bleeding" Line */}
        <motion.polyline
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.5))' }}
        />

        {/* SPRING-LOADED SCANNER */}
        <AnimatePresence>
          {hoverData && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.line 
                style={{ x: springX }}
                x1="0" y1="-20" x2="0" y2={height + 20} 
                stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4"
                className="opacity-50"
              />
              <motion.circle 
                style={{ x: springX }}
                cx="0" cy={height - ((hoverData.val - min) / (range || 1)) * height} 
                r="6" fill="#ef4444" 
                className="shadow-inner"
              />
              {/* Ripple Effect */}
              <motion.circle 
                style={{ x: springX }}
                cx="0" cy={height - ((hoverData.val - min) / (range || 1)) * height} 
                r="15" stroke="#ef4444" strokeWidth="1" fill="none"
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </motion.g>
          )}
        </AnimatePresence>

        <defs>
          <linearGradient id="eliteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#991b1b" /><stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Interactive Tooltip */}
      <AnimatePresence>
        {hoverData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{ left: hoverData.x + 20, top: '40%' }}
            className="absolute z-50 pointer-events-none"
          >
            <div className="bg-black/90 border border-red-950/80 backdrop-blur-md p-4 rounded-xl shadow-2xl min-w-[140px]">
              <div className="flex items-center gap-2 mb-2">
                <Activity size={12} className="text-red-700 animate-pulse" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Vault Snapshot</span>
              </div>
              <div className="text-2xl font-black font-mono text-gray-100">${hoverData.val.toLocaleString()}</div>
              <div className={`text-[9px] font-bold mt-1 uppercase ${hoverData.isWin ? 'text-emerald-500' : 'text-red-600'}`}>
                {hoverData.isWin ? 'Trend: Optimized' : 'Trend: High Stress'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
          <p className="text-[10px] font-black text-red-900 uppercase tracking-[0.4em]">Biometric Sync Active</p>
        </div>
        <motion.div 
          animate={{ opacity: [1, 0.8, 1] }} 
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-4xl font-black font-mono tracking-tighter text-gray-100"
        >
          ${Math.abs(dataPoints[dataPoints.length - 1]).toLocaleString()}
        </motion.div>
      </div>
    </motion.div>
  );
}