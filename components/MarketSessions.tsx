'use client';
import { useEffect, useState } from 'react';

export default function MarketSessions() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getSessionStatus = (start: number, end: number) => {
    const hour = time.getUTCHours();
    // Simple UTC logic for sessions
    if (hour >= start && hour < end) return 'ACTIVE';
    return 'CLOSED';
  };

  const sessions = [
    { name: 'London', start: 8, end: 16, color: 'text-blue-500' },
    { name: 'New York', start: 13, end: 21, color: 'text-red-500' },
    { name: 'Tokyo/Sydney', start: 0, end: 9, color: 'text-yellow-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {sessions.map((s) => {
        const status = getSessionStatus(s.start, s.end);
        return (
          <div key={s.name} className="bg-[#0a0a0a] border border-red-950/30 p-4 rounded-lg flex justify-between items-center relative overflow-hidden group">
            <div>
              <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{s.name} Session</p>
              <h3 className={`text-lg font-black mt-1 ${status === 'ACTIVE' ? s.color : 'text-gray-800'}`}>
                {status}
              </h3>
            </div>
            {status === 'ACTIVE' && (
              <div className={`w-2 h-2 rounded-full animate-pulse ${s.color.replace('text', 'bg')}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}