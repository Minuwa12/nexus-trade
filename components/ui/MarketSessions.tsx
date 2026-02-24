'use client';

import { useState, useEffect } from 'react';

const SESSIONS = [
  { name: 'NEW YORK', open: 13, close: 22 }, // 13:00 - 22:00 UTC
  { name: 'LONDON',   open: 8,  close: 17 }, // 08:00 - 17:00 UTC
  { name: 'TOKYO',    open: 0,  close: 9  }, // 00:00 - 09:00 UTC
  { name: 'SYDNEY',   open: 22, close: 7  }, // 22:00 - 07:00 UTC
];

export default function MarketSessions() {
  const [utcHour, setUtcHour] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcHour(now.getUTCHours());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  if (utcHour === null) return null;

  return (
    <div className="flex items-center gap-6 px-6 py-2 bg-[#0a0a0a]/50 border border-red-950/30 rounded-full backdrop-blur-md">
      {SESSIONS.map((session) => {
        const isOpen = session.open < session.close
          ? utcHour >= session.open && utcHour < session.close
          : utcHour >= session.open || utcHour < session.close; // Handles Sydney overnight

        return (
          <div key={session.name} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${
              isOpen 
                ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' 
                : 'bg-gray-800'
            }`}></div>
            <span className={`text-[10px] font-black tracking-widest uppercase transition-colors duration-500 ${
              isOpen ? 'text-gray-100' : 'text-gray-600'
            }`}>
              {session.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}