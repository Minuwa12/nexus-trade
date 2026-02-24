'use client';

import { useState, useEffect } from 'react';

const MARKETS = [
  { name: 'New York', open: 13, close: 22 },
  { name: 'London', open: 8, close: 17 },
  { name: 'Tokyo', open: 23, close: 8 },
  { name: 'Sydney', open: 22, close: 7 },
];

export default function LiveSessionClock() {
  const [activeSessions, setActiveSessions] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const checkSessions = () => {
      const now = new Date();
      const currentUtcHour = now.getUTCHours();
      
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', timeZoneName: 'short' 
      }));

      const active = MARKETS.filter((market) => {
        if (market.open < market.close) {
          return currentUtcHour >= market.open && currentUtcHour < market.close;
        } else {
          return currentUtcHour >= market.open || currentUtcHour < market.close;
        }
      }).map(m => m.name);

      setActiveSessions(active);
    };

    checkSessions();
    const interval = setInterval(checkSessions, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-6 bg-[#111111] border border-gray-800 rounded-full px-4 py-2">
      <div className="text-gray-400 text-sm font-mono border-r border-gray-800 pr-4">
        {currentTime || '00:00:00 UTC'}
      </div>
      
      <div className="flex space-x-4">
        {MARKETS.map((market) => {
          const isActive = activeSessions.includes(market.name);
          return (
            <div key={market.name} className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                {isActive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isActive ? 'bg-emerald-500' : 'bg-gray-700'}`}></span>
              </span>
              <span className={`text-xs font-bold tracking-wider uppercase ${isActive ? 'text-white' : 'text-gray-600'}`}>
                {market.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}